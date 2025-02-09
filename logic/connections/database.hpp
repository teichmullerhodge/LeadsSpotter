#ifndef DATABASE_HPP
#define DATABASE_HPP

#include "../safe/hashpp.hpp"
#include "credentials.h"
#include "queries.h"
#include <pqxx/pqxx> 

#define CONNECTION_REFUSED "Could not connect to database"
#define EXCEPTION_OCURRED "Exception when trying to connect to the database\n"





/**
 * Class database to handle interactions with your desired db.
 * WILL THROW AN EXCEPTION if credentials are incorrect. 
 * Handle in a try-catch statement.
 */
class Database {
    private:

        pqxx::connection C = pqxx::connection(Credentials::connectionString);
        bool isConnected;

    public:

        Database() : isConnected(false) {
            this->isConnected = C.is_open();
        }


       bool is_connected() const {

            return isConnected;
       }

       void new_user(std::string username, std::string email, std::string phone, std::string passwordHash, std::optional<int> ploomesId,  std::string apiKey){

            pqxx::work transaction{C};            
            transaction.exec_params(Queries::NewUser, username, email, phone, passwordHash, ploomesId, apiKey);
            transaction.commit();

       }

       bool email_exists(std::string email){
        
            pqxx::work transaction{C};
            pqxx::result emailQuery = transaction.exec_params(Queries::SelectEmail, email);
            return !emailQuery.empty();
       }


        std::pair<bool, std::optional<std::string>> is_valid_login_credentials(const std::string& userMail, const std::string& _inputPassword) {
            
            pqxx::work transaction{C};
            pqxx::result result = transaction.exec_params(Queries::AuthenticationQuery, userMail);
            if (result.empty()) {
                transaction.commit();
                return {false, std::nullopt}; 
            }

            std::string storedHash = result[0][0].as<std::string>();
            std::string userKey = result[0][1].as<std::string>();

            bool isValid = Generator::verify_password(_inputPassword.c_str(), storedHash.c_str());
            transaction.commit();
            return {isValid, isValid ? std::optional<std::string>(userKey) : std::nullopt};
        }



       std::optional<std::string> get_user_key(const std::string email) {

            pqxx::work transaction{C};
            pqxx::result keyQuery = transaction.exec_params(Queries::GetStoreUserKey, email);
            bool keyCollected = !keyQuery.empty();

            if(keyCollected){
                transaction.commit();
                return keyQuery[0][0].c_str();
            }
            transaction.commit();
            return std::nullopt;

       }

};

#endif