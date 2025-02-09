import requests 



def response_ok(status: int) -> bool:
    
    return status >= 200 and status <= 299


def send_message(message: str) -> None:
    
    localURL: str = "http://localhost:8080/chat"
    payload = {"Message" : message}
    defaultHeaders = {"Content-Type" : "application/json"}
    response = requests.post(url=localURL, 
                             json=payload, 
                             headers=defaultHeaders)
    statusCode = response.status_code
    if response_ok(statusCode):
        data = response.json()
        print(data)
    else:
        print(f'Request failed with status: [{statusCode}]')
        print(f'Error: [{response.text}]') 
        
        

if __name__ == "__main__":
    
    send_message("Hello, you are running in a c++ crow server. It's taking 3 seconds to your response being fullfilled. This is due to YOUR api being slow or my server?")
    