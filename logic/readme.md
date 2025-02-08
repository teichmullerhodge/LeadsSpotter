# Emerald

This is a simple server using crow as library.

## Requirements

- CMake =^3.10 
- Boost
- OpenSSL
- Crow (git clone https://github.com/CrowCpp/Crow.git) 
      or get Crow from https://crowcpp.org/master/

## How to run the project

1. Clone the repository:

    ```bash
    git clone https://github.com/teichmullerhodge/Emerald.git
    cd Emerald
    ```

2. Create a build directory and compile the project

    ```bash
    mkdir build
    cd build
    cmake ..
    make
    ```

3. Run the server:

    ```bash
    ./my_crow_server
    ```

## Dependencies

The dependencies are managed by CMake. **Crow** will be downloaded automatically 
when you run ` cmake.. `.

## License

Free as freedom.