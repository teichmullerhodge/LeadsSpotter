#ifndef LOGGER_HPP
#define LOGGER_HPP

#include <iostream>
#include <fstream>


enum LoggerStatus {

    SUCCESS = 0,
    ERROR = 1,
    WARNING = 2,
    INFO = 3

};


/**
 * @file logger.cpp
 * @brief Logger class implementation
 * Logger class is responsible for logging messages to the console or to a file
 * It will use different colors for different types of messages
 * 
 */
class Logger {

    public:
    
        static void log(std::string message, LoggerStatus status) {
            
            std::string color = Logger::get_color(status);
            std::string type = Logger::get_type(status);
            std::cout << color << "[" << type << "] " << message << "\033[0m" << '\n';
        }

     
        static void log_to_file(std::string message, std::string type, std::string file) {
            std::ofstream logFile;
            logFile.open(file, std::ios::app);
            logFile << "[" << type << "] " << message << '\n';
            logFile.close();
        }

        static std::string get_color(LoggerStatus status) {
            std::string color = "";

            switch(status) {
                case LoggerStatus::SUCCESS:
                    color = "\033[1;32m";
                    break;
                case LoggerStatus::ERROR:
                    color = "\033[1;31m";
                    break;
                case LoggerStatus::WARNING:
                    color = "\033[1;33m";
                    break;
                case LoggerStatus::INFO:
                    color = "\033[1;37m";
                    break;
            }

            return color;
        }

        static std::string get_type(LoggerStatus status) {
            std::string type = "";

            switch(status) {
                case LoggerStatus::SUCCESS:
                    type = "SUCCESS";
                    break;
                case LoggerStatus::ERROR:
                    type = "ERROR";
                    break;
                case LoggerStatus::WARNING:
                    type = "WARNING";
                    break;
                case LoggerStatus::INFO:
                    type = "INFO";
                    break;
            }

            return type;
        }

};

#endif