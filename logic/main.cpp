#include "crow.h"
#include <math.h>
/**
 * for "all" natural numbers
 * 
 */
typedef unsigned long long int natural;


bool is_prime(natural n){

    if(n % 2 == 0 || n < 2) return false;
    if(n == 2 || n == 3) return true;

    for(natural k = 3; k < sqrt(n); k+= 2){
        if(n % k == 0) return false;
    }

    return true;

}

int main() {
    crow::SimpleApp app;

    // Definindo uma rota básica
    CROW_ROUTE(app, "/")([](){
        return "Hello, Crow!";
    });

    CROW_ROUTE(app, "/json")([](){
        crow::json::wvalue x;
        x["message"] = "Hello, Crow!";
        return x;
    });

    CROW_ROUTE(app, "/is-prime/<string>")([](const std::string& number_ref){
            std::stringstream stream(number_ref);
            natural number;
            stream >> number;
            if(stream.fail()){
                crow::json::wvalue errorResponse;
                errorResponse["Reason"] = "Bad request. A number is expected";
                return crow::response(400, errorResponse);

            }
            crow::json::wvalue response;
            response["IsPrime"] = is_prime(number);
            return crow::response(200, response);
    });

    CROW_ROUTE(app, "/number-info/<string>")([](const std::string& number_ref){

        std::stringstream stream(number_ref);
        natural number;
        stream >> number;
        if(stream.fail()){
            crow::json::wvalue errorResponse;
            errorResponse["Reason"] = "Bad request. A number is expected";
            return crow::response(400, errorResponse);

        }

        crow::json::wvalue response;
        response["IsPrime"] = is_prime(number);
        response["IsOdd"] = number % 2 != 0;
        response["IsEven"] = number % 2 == 0;
        return crow::response(200, response);

    });

    CROW_ROUTE(app,"/even-odd/<int>")([](int count){
        std::cout << count << std::endl;
        return count % 2 == 0 ? crow::response(200, "Even") : crow::response(200, "Odd");
    });

    app.port(8080).multithreaded().run();
}
