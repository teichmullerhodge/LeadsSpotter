#include "crow.h"
#include "crow/middlewares/cors.h"
#include "connections/database.hpp"
#include "safe/hashpp.hpp"
#include "network/http.hpp"
#include "openai/chat.hpp"

Database PG_INSTANCE;
#define VERIFY_DB_RUNTIME() if(!PG_INSTANCE.is_connected()){throw std::runtime_error(CONNECTION_REFUSED);}


class CORS {
public:
    struct context {};

    void before_handle(crow::request& /*req*/, crow::response& res, context& /*ctx*/) {
        res.add_header("Access-Control-Allow-Origin", "*");
        res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.add_header("Access-Control-Allow-Headers", "Content-Type");
    }

    void after_handle(crow::request& /*req*/, crow::response& res, context& /*ctx*/) {
        res.add_header("Access-Control-Allow-Origin", "*");
        res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.add_header("Access-Control-Allow-Headers", "Content-Type");
    }
};

int main() {

    crow::App<CORS> app;
    VERIFY_DB_RUNTIME();

    CROW_ROUTE(app, "/login").methods("POST"_method)([](const crow::request& req) {
        
        crow::json::wvalue response;

     try {

        crow::json::rvalue jsonBody = crow::json::load(req.body);
        if (!jsonBody){
            response["Reason"] = HTTP::NO_BODY;
            return crow::response(HTTP::BAD_REQUEST, response);
        }

        std::string email = jsonBody["Email"].s();
        std::string password = jsonBody["Password"].s();

        if(email.empty() || password.empty()){
            response["Reason"] = HTTP::MISSING_FIELDS;
            return crow::response(HTTP::BAD_REQUEST, response);
        }
        
        auto [isValidAccess, userKey] = PG_INSTANCE.is_valid_login_credentials(email, password);

       if(isValidAccess){
        if(!userKey.has_value()){

            Logger::log(HTTP::VIOLATION_CONSTRAINTS, LoggerStatus::ERROR);
            response["Reason"] = HTTP::GENERIC_ERROR; 
            return crow::response(HTTP::INTERNAL_SERVER_ERROR, response);

        }    

        response["Message"] = HTTP::ACCESS_GRANTED;
        response["UserKey"] = userKey.value();
        return crow::response(HTTP::OK, response);

       }

       response["Reason"] = HTTP::WRONG_CREDENTIALS;
       return crow::response(HTTP::UNAUTHORIZED, response);

     }

     catch (const std::exception& e){
        Logger::log(e.what(), LoggerStatus::ERROR);
        response["Reason"] = HTTP::GENERIC_ERROR;
        return crow::response(HTTP::INTERNAL_SERVER_ERROR, response);
     }
       
    });

    CROW_ROUTE(app, "/register").methods("POST"_method)([](const crow::request& req) {
        
        crow::json::wvalue response;

        try {

            auto jsonBody = crow::json::load(req.body);
            if (!jsonBody){
                response["Reason"] = HTTP::NO_BODY;
                return crow::response(HTTP::BAD_REQUEST, response);
            }

            std::string username = jsonBody["Name"].s();
            std::string email = jsonBody["Email"].s();
            std::string phone = jsonBody["Phone"].s();
            std::string password = jsonBody["Password"].s();
            std::optional<int> ploomesId = jsonBody["PloomesId"].i();

            if(username.empty() || email.empty() || phone.empty() || password.empty()){
                response["Reason"] = HTTP::MISSING_FIELDS;
                return crow::response(HTTP::BAD_REQUEST, response);
            }

            if(PG_INSTANCE.email_exists(email)){
                response["Reason"] = HTTP::EMAIL_EXISTS;
                return crow::response(HTTP::CONFLICT, response);
            }

            std::optional<std::string> hashedPass = Generator::hash_password(password.c_str());
            std::optional<std::string> userKey = Generator::generate_api_key();
            
            if(hashedPass.has_value() && userKey.has_value()){
                PG_INSTANCE.new_user(username, email, phone, hashedPass.value(), ploomesId, userKey.value());
                response["UserKey"] = userKey.value();
                return crow::response(HTTP::CREATED, response);
            } else {
                response["Reason"] = HTTP::GENERIC_ERROR;
                return crow::response(HTTP::INTERNAL_SERVER_ERROR, response);
            }

        }

        catch (const std::exception& e){
            Logger::log(e.what(), LoggerStatus::ERROR);
            response["Reason"] = HTTP::GENERIC_ERROR;
            return crow::response(HTTP::INTERNAL_SERVER_ERROR, response);
        }
    });

    CROW_ROUTE(app, "/chat").methods("POST"_method)([](const crow::request& req) {
        
        crow::json::wvalue response;

        try {

            auto jsonBody = crow::json::load(req.body);
            if (!jsonBody){
                response["Reason"] = HTTP::NO_BODY;
                return crow::response(HTTP::BAD_REQUEST, response);
            }

            std::string message = jsonBody["Message"].s();
            if(message.empty()){
             
                response["Reason"] = HTTP::MISSING_FIELDS;
                return crow::response(HTTP::BAD_REQUEST, response);

            }

            std::string contents = Chat::message(message);
            response["Contents"] = contents;
            return crow::response(HTTP::OK, response);



        }

        catch(const std::exception& e) {

            Logger::log(e.what(), LoggerStatus::ERROR);
            response["Reason"] = HTTP::GENERIC_ERROR;
            return crow::response(HTTP::INTERNAL_SERVER_ERROR, response);

        }

    });
 
    app.port(8080).multithreaded().run();
}
