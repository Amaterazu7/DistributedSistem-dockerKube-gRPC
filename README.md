## Distributed System with Docker, Kubernetes, MySQL & ExpressJS

<a href="https://nodejs.org/es/docs/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/400px-Node.js_logo.svg.png" width="70"></a><a>  </a><a href="https://dev.mysql.com/doc/"><img src="https://d1q6f0aelx0por.cloudfront.net/product-logos/0dd7193f-e747-4a15-b797-818b9fac3656-mysql.png" width="70"></a><a>  </a><a href="https://docs.docker.com/"><img src="https://docs.docker.com/favicons/docs@2x.ico" width="32"></a><a>  </a><a href="https://kubernetes.io/es/docs/home/"><img src="https://kubernetes.io/images/nav_logo.svg" width="180"></a>


## Why Docker

"With Docker, developers can build any app in any language using any toolchain. “Dockerized” apps are completely portable and can run anywhere - colleagues’ OS X and Windows laptops, QA servers running Ubuntu in the cloud, and production data center VMs running Red Hat.

Developers can get going quickly by starting with one of the 13,000+ apps available on Docker Hub. Docker manages and tracks changes and dependencies, making it easier for sysadmins to understand how the apps that developers build work. And with Docker Hub, developers can automate their build pipeline and share artifacts with collaborators through public or private repositories.

Docker helps developers build and ship higher-quality applications, faster." -- [What is Docker](https://www.docker.com/what-docker#copy1)


## Getting Started

These instructions will cover usage information and for the docker container.


### Prerequisities

In order to run this container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Usage

#### Container Parameters

Here we create a image in order to create a containers.

```shell
$ docker build -t docker-rappi-oeste:1.0.0 .
```

One example running the docker image in our local port 9000.

```shell
$ docker run -it -p 9000:3000 docker-rappi-oeste:1.0.0
```

Or we can run the docker compose that already have everything defined.

```shell
$ docker-compose build
```

#### Environment Variables

* `HOME` - This is the path of our app location inside the container `/usr/src/app`

#### Volumes

* `/your/file/location` - File location


## Authors

* **Diego Leonel Cañete** - *Initial work*

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.
