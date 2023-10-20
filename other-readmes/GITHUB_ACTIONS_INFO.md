# GitHub Actions Information
Currently, GitHub actions is configured to run a deployment every time something is pushed to 
a branch, deployment involves running all tests defined within the `tests` file located in the
server folder. This is where you should write all your unit tests for the server side of the
application.

The tests are written in TypeScript with chai and mocha. Documentation for them can be found [here](https://dev.to/matteobruni/mocha-chai-with-typescript-37f).

## Future Development of GHA
For now, the deployment process is very bare-bones, and is simply written in order to run the unit tests
with every change to the repository and there are a lot of commented out sections.

### Commented Sections
The commented section within the Build.yml file describe the optimal deployment process, where
the packaged files will be put in a docker image and be sent to GitHub Container Registry (ghcr)
in order for this to work, you will need to create a token within a GitHub account that has 
admin access to this repository, that token should have package privileges and will be used to
sign in to ghcr in order to push the docker image there. Documentation on how to create this token
can be found [here](https://nikiforovall.github.io/docker/2020/09/19/publish-package-to-ghcr.html#:~:text=To%20access%20GitHub%20container%20registry,settings%2Ftokens%2Fnew).

Creating this token also means you can uncomment the sections within the [docker-compose.yaml](docker-compose.yaml) file.

You will also be required to create an account with AWS and add your account number in to the 
labelled spots as well in order to set up the AWS deployment with Terraform.

### AWS and Terraform
The AWS deployment should be set up once you have included the appropriate AWS account Id and
uncommented the sections within the [Build.yml](.github/workflows/build.yml) file. What this
will do, is deploy your docker image for both the server and client to their own ECS clusters
which will then host them and allow them to run properly. There are also cloudwatch logs included
so that you will be able to monitor these containers and any error logs they may be giving.