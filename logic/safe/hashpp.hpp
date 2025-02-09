#ifndef HASHPP_HPP
#define HASHPP_HPP


#include <sodium.h>
#include <iostream>
#include <string.h>
#include <optional>
#include "../logger/logger.hpp"

const int HASH_SIZE = crypto_pwhash_STRBYTES;

#define SODIUM_NOT_INITIALIZED "Error initializing libsodium."
#define ERROR_GENERATING_HASH "Error generating hash."
#define ERROR_VERIFYING_HASH "Hash provided don't match."

#define OPS_LIMIT  crypto_pwhash_OPSLIMIT_MODERATE
#define MEM_LIMIT  crypto_pwhash_MEMLIMIT_MODERATE
#define GENERIC_HASH_B crypto_generichash_BYTES


class Generator {
    private:

        char hashedPassword[HASH_SIZE];
        int hashGenerated = 0;

    public:

        static std::optional<std::string> hash_password(const char *_p){

            if (sodium_init() < 0) {
                    Logger::log(SODIUM_NOT_INITIALIZED, LoggerStatus::ERROR);
                    return std::nullopt;
            }


            char hashedPassword[HASH_SIZE];
            if(crypto_pwhash_str(hashedPassword, _p, strlen(_p), OPS_LIMIT, MEM_LIMIT) != 0){
                        Logger::log(ERROR_GENERATING_HASH, LoggerStatus::ERROR);
                        return std::nullopt;
            }

            return std::string(hashedPassword);

        }

        static std::optional<std::string> generate_api_key() {
        
            if (sodium_init() < 0) {
                Logger::log(SODIUM_NOT_INITIALIZED, LoggerStatus::ERROR);
                return std::nullopt;
            }

            constexpr size_t API_KEY_SIZE = 32; 
            unsigned char apiKey[API_KEY_SIZE];
            randombytes_buf(apiKey, API_KEY_SIZE);

            char hexKey[API_KEY_SIZE * 2 + 1];
            sodium_bin2hex(hexKey, sizeof(hexKey), apiKey, API_KEY_SIZE);

            return std::string(hexKey);

        }

        static bool verify_password(const char *providedPassowrd, const char *storedHash) {

            if (sodium_init() < 0) {
                    Logger::log(SODIUM_NOT_INITIALIZED, LoggerStatus::ERROR);
                    return false;
            }


            return crypto_pwhash_str_verify(storedHash, providedPassowrd, strlen(providedPassowrd)) == 0;

        }
      

};

#endif