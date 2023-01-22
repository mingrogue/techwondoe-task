To Run

Install Docker and docker-compose


# docker-compose run auth-service npm i
# docker-compose run company-service npm i
# docker-compose up

Services - auth and company service

Postman Collection provided.

- Get Token => gets an auth token with client credentials flow. client is registered in auth server. scopes accepting - read and write. Returns Jwt with requested scopes and mail id
- Get All Companies
- Get Company By id
- Get Company By Company Name (search not enabled as automatic cretion of text index is not covered in docker deploy, enter full name)
- Get All Teams
- Add Company ( cannot add comany with duplicate names)
- Add Team


must attach the unexpired auth token with all requests or get 401 error

