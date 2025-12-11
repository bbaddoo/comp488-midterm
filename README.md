Set up instructions and architecture overview:

FINAL MODIFICATIONS: So, what i have done now forme the live commenting on my midterm is I have have added tunneling and logging to my website. I am using datadog for my visualization and ngrok for my tunneling with a public link. For datadog I used my secret and API key and launched it with kubectl apply -f datadog_agent.yaml -n datadog and kubectl get pods -n datadog to check the logs. I then downloaded ngrok and made the public server link for it to join and launched it with ngrok my port which is 3000. I also have my frontend monitoring with this my API key through datadog.


-Cloning the provided repository and building out my docker images
-ex for frontend: docker build -t comp-midterm:1.0 ./frontend
-repeat for the order-api and product-api(make sure to use correct image name
ex: order-api:1.0 and product-api:1.0 after the -t. At the end after ./ just use the file name oder-api and product-api)

-Tag and push ro the github repo
-Use: docker tag comp-midterm:1.0 ghcr.io/< username >/comp488-midterm-frontend:1.0
Repeat for order and product: docker tag product-api:1.0 ghcr.io/< >/comp488-midterm-product-api:1.0/ docker tag order-api:1.0 ghcr.io/< username >/comp488-midterm-product-api:1.0
(to tag mine I had to log into ghcr.it using my token)

-Then push each one: docker push ghcr.io/< username >/comp488-midterm-frontend:1.0
docker push ghcr.io/< username >/comp488-midterm-product-api:1.0
docker push ghcr.io/< username >/comp488-midterm-order-api:1.0
-Then deploy: kubectl apply -f ./k8s/



Overview:
-made sure node was installed
-Had the shells for my "mock" websites in my front end.
-Put every app into their own Dockerfile.
-(installs services like flask and npm for express for the frontend server. Also, when docker runs and add the .json for my dependencies)
-I have my frontend running on port 3000
-I have my Product API running on 5000(locally 5050)
-I have my Oder API running on 6000c(locally 6060)
- I have Kubernetes deployed for each of the services (frontend, order, and product)
- I also have the services (nodeport access) for each service.
-  I have the HPA, health checks, configmap, and secrets set up as well.
- I had to figure out the CI/CD pipeline for GitHub actions that will build my Docker images, push to the GHRC, and deploy Kubernetes automatically. Along with doing the checks/scanning.
- For me image names were changed to match the ones when I pushed(ghcr.io/bbaddoo/comp488-midterm-order-api:1.0 (repeated for each)) but then I changed them back to thier local names.
- At first, I tried to use Portainer, which after doing some research, really simplifies the process. It works perfectly fine up until need to pay 99 dollars for a simple URL needed for my github secret to be able to do it automatically, so I ended up doing the above option instead.
- Monitoring set up for prometheus and Grafana(with helm) alerting pod restarts (>3 in 10 min)
-  API response times (>2s for 5 min), error rates (>5% for 5 min)
-  disk usage (>85%)
-  For my secrets management, I did it through Kubernetes and had the kube config key stored as a secret in GitHub. Also made sure to have all sensitive data in gitignore along with the modules.


Troubleshooting:
-pods in  CrashLoopBackOff: I did have this happen to me and it was because of a port issue.
I accidentally mismatched one of the ports (order-api) so I went back and checked the logs for it, fixed the port, and it started working.

slow application with normal metrics:
I would have once again checks the logs to see if there were any errors.
I would also checked the Prometheus and Grafana dashboards for any errors as well.  I would think I had to increase the amount od replicas or adjust CPU/memory.

 image pull errors:
 -I would check each pod description using the describe command for any errors.
 - I would make sure in the the .yaml file it had the right image name. I did also have this happen to me and I had to go back in each one and check they were correct and that they were exactly typed to the ones I had saved in Docker.



