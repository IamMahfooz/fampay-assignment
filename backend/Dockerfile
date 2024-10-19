# Use an official Golang image as the base image
FROM golang:1.22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application code
COPY . .


# Expose the port the app will run on
EXPOSE 5004

# Build the Go application
RUN go build -o myapp .

# Set the entrypoint to the application binary
CMD ["./myapp"]

