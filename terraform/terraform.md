#Terraform Description

Terraform is used within the development process in order to create the required parts within
AWS to get the application hosted and working on both ends. Terraform will also keep track of any
changes made to these components and will only update those specified sections within AWS instead of
overwriting all of it and creating it again.

There are 3 main sections to this terraform configuration
- The components
- the variable definitions
- the variable values

## The components

There are 4 main files, main, cluster, the backend, and frontend files. Each of these do a specific
task when creating AWS components. The cluster file reads the name of your cluster variable within 
the environment variables you provide, this means you will have to create an AWS cluster before
you run this build process so that it doesn't fail. What this will then do, is create your
ecs tasks that will run your docker image you create during the build process and will run them
on a hosted web server.

## The variable definitions

The variables file is what you use to define all variables used within your terraform functions.
They all follow the same definition patten and can then be referenced within your terraform files

## The variable values

The variable values are your environment variables that contain the actual values of what your
definitions file is using. These environment variables files are what are used during the
deployment process in order to correctly name and set up your AWS environment.