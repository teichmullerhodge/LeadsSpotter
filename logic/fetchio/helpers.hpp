#ifndef UTILS_H 
#define UTILS_H


#define FAILED_FETCHIO_INITIALIZATION "Error initializing Fetchio."
#define FAILED_PERFORMING_REQUEST "Error making request."

#include <iostream>
#include "../logger/logger.hpp"

namespace FetchioUtils {

        constexpr const char *CONTENT_TYPE_JSON = "Content-Type: application/json";

}



class FetchioErrors {

    public:

        static void initialization_error(){
            Logger::log(FAILED_FETCHIO_INITIALIZATION, LoggerStatus::ERROR);
        
        }

        static void request_error(){
            Logger::log(FAILED_PERFORMING_REQUEST, LoggerStatus::ERROR);
        }

};




#endif 