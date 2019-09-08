## Distributed System with Docker, Kubernetes, MySQL & ExpressJS

[![Docker](https://docs.docker.com/favicons/docs@2x.ico =100x20)](https://docs.docker.com/) [![Kubernetes](https://kubernetes.io/images/nav_logo.svg =100x20)](https://kubernetes.io/es/docs/home/)


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

This project is licensed under the GPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details.
