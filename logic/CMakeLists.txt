
cmake_minimum_required(VERSION 3.10)

project(Emerald)

set(CMAKE_CXX_STANDARD 17)

add_subdirectory(Crow)

add_executable(my_crow_server main.cpp)

target_include_directories(my_crow_server PRIVATE ${CMAKE_SOURCE_DIR}/Crow/include)

target_link_libraries(my_crow_server PRIVATE pthread)
target_link_libraries(my_crow_server PRIVATE boost_system)
target_link_libraries(my_crow_server PRIVATE ssl)
target_link_libraries(my_crow_server PRIVATE crypto)
