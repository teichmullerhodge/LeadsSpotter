#ifndef CHAT_HPP
#define CHAT_HPP

#include "../fetchio/fetchio.hpp"
#include "helpers.hpp"
#include <iostream>
#include "secrets.hpp"
#include <string> 
#include <nlohmann/json.hpp>

class Chat {

 public:

    static std::string message(const std::string m){

        auto httpInstace = Fetchio(OpenAiRoutes::Chat);
        std::string payload = R"(
            {
                "model": "gpt-4",
                "messages": [
                    {"role": "user", "content": ")" + m + R"("}
                ]
            }
        )";

        httpInstace.set_body(payload);

        httpInstace.set_headers(FetchioUtils::CONTENT_TYPE_JSON);
        httpInstace.set_headers(OpenAiCredentials::AUTH_HEADERS);
        httpInstace.grant_headers(); //lol.

        std::string response = httpInstace.post(std::nullopt);
        nlohmann::json jsonContents = nlohmann::json::parse(response);
        std::string contents = jsonContents["choices"][0]["message"]["content"];
        return contents;


    }
};



#endif