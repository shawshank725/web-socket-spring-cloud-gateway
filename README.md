# WebSocket Gateway Notification Project

This project demonstrates a solution for enabling WebSocket communication between a React frontend and a Spring Boot-based notification service via a Spring Cloud Gateway, with service discovery handled by Consul. It addresses common WebSocket connectivity issues and provides a working setup for developers facing similar challenges.

## Technologies Used
- **Spring Boot**: Backend framework.
- **Spring Cloud Gateway**: API gateway for routing WebSocket traffic.
- **Consul**: Service discovery and configuration management.
- **React**: Frontend framework.
- **Java**: Programming language for backend.
- **MySQL**: Database for storing notification data.
- **JPA (Hibernate)**: ORM for database interactions.

## How to Run the Project

### Prerequisites
- Install MySQL and ensure it is running.
- Install Node.js and npm for the frontend.
- Install IntelliJ (or any IDE) for backend development.
- Open Command Prompt as Administrator.

### Steps

1. **Start Consul**:
   - Open the `start.txt` file for reference.
   - Run the following command in Command Prompt:
     ```
     consul agent -server -bootstrap-expect=1 -data-dir=consul-data -ui -bind=<your-ip-address>
     ```
     - To find your IP address, type `ipconfig` in Command Prompt and copy the IPv4 address. Replace `<your-ip-address>` with this value.
   - Wait until you see "Consul agent running" in the console.

2. **Run Backend Services in IntelliJ**:
   - Open the project in IntelliJ (or your preferred IDE).
   - Start the services in this order:
     1. **Config Server** (port 8888)
     2. **Gateway** (port 9999)
     3. **Notification Service** (port 8080)
   - Ensure you have run the SQL scripts to create the `notificationdatabase` and its tables in MySQL.

3. **Run Frontend in VS Code**:
   - Open the frontend project in VS Code (or any code editor).
   - Install dependencies by running:
     ```
     npm install
     ```
   - Start the frontend with:
     ```
     npm run dev
     ```

4. **Access the Application**:
   - Open your browser and navigate to `http://localhost:5173`.
   - Open Developer Tools (Ctrl + Shift + I), go to the Console tab, and verify the WebSocket connection to `ws://localhost:9999/ws` is established.

## Project Use Case
This project addresses the challenge of enabling WebSocket communication between a frontend and a notification service (or any other service) through a gateway. I encountered significant difficulties with this setup, and this project is designed to help others facing similar issues.

### Issues Faced
- **Invalid Upgrade Header**
- **403 Forbidden**
- **400 Bad Request**
- **Lost Connection to WebSocket `ws://localhost:9999/ws`**

### How the Project Works
- **Ditched SockJS**: Removed SockJS from both frontend and backend to simplify WebSocket implementation.
- **WebSocket Configuration**: In the `WebSocketConfig` file of the notification service:
  - Removed `.withSockJS()` from `registerStompEndpoints`.
  - Added `.setAllowedOriginPatterns("http://localhost:5173")` to allow the frontend origin.
- **Gateway Configuration**: In the `application.yml` file:
  - Applied filters:
    ```yaml
    filters:
      # - RewritePath=/ws(?<remains>/?.*), /ws${remains}  # Commenting out as it has no effect
      - PreserveHostHeader
    ```
  - Note: The `RewritePath` filter was found to be unnecessary and its presence or absence does not impact functionality.

### Key Files
- **Gateway `application.yml`**: Configures routing and filters for WebSocket communication.
- **Notification Service `WebSocketConfig`**: Manages WebSocket endpoints and origin settings.
- Other folders (e.g., `entity`, `repository`, `service`, `controller`) are not directly related to WebSocket functionality.

## Notes
- Ensure all services are running and properly configured with Consul.
- The project focuses solely on resolving WebSocket communication issues via the gateway and notification service configuration.
