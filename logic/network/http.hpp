#include <string>

namespace HTTP {

    enum SuccessCodes : unsigned int {

        OK = 200U,
        CREATED = 201U,
        ACCEPTED = 202U,
        NO_CONTENT = 204U,
        RESET_CONTENT = 205U,
        PARTIAL_CONTENT = 206U,
    };

    enum ErrorCodes : unsigned int {

        BAD_REQUEST = 400U,
        UNAUTHORIZED = 401U,
        FORBIDDEN = 403U,
        NOT_FOUND = 404U,
        METHOD_NOT_ALLOWED = 405U,
        REQUEST_TIMEOUT = 408U,
        CONFLICT = 409U,
        INTERNAL_SERVER_ERROR = 500U,    

    };

    const std::string ACCESS_GRANTED = "Access granted";
    

    const std::string NO_BODY = "No body provided in the request.";
    const std::string MISSING_FIELDS = "Missing fields in the request.";
    const std::string WRONG_CREDENTIALS = "Wrong credentials provided.";
    const std::string EMAIL_EXISTS = "Email already in use.";
    const std::string VIOLATION_CONSTRAINTS = "UserKey is null violating database constraints.";
    /// Generic error message to be used when an exception is thrown.    
    const std::string GENERIC_ERROR = "An error ocurred while processing your request.";

}