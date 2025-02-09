#ifndef QUERIES_H
#define QUERIES_H


#include <string>

namespace Queries {

    const std::string NewUser = R"(INSERT INTO "Users" ("Name", "Email", "Phone", "Password", "PloomesId", "UserKey", "CreatedAt")  VALUES ($1, $2, $3, $4, $5, $6, NOW()))";
    const std::string GetStoredHash = R"(SELECT "Password" FROM public."Users" WHERE "Email" = $1)";
    const std::string GetStoreUserKey = R"(SELECT "UserKey" FROM public."Users" WHERE "Email" = $1)";
    const std::string SelectEmail = R"(SELECT "Email" FROM public."Users" WHERE "Email" = $1)";
    const std::string AuthenticationQuery = R"(SELECT "Password", "UserKey" FROM public."Users" WHERE "Email" = $1)";
}

#endif
