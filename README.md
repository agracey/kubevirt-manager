# kubevirt-manager


**Maintainers:** [feitnomore](https://github.com/feitnomore/)

Simple Angular Frontend Web UI Interface to operate [Kubevirt](https://kubevirt.io/). This tools lets you perform basic operations around `Virtual Machines`, `Virtual Machine Instances`, and `Disks`. It was built based on requirements I had for my own environment.

*WARNING:* Use it at your own risk.

## INTRODUCTION

I've created this Frontend for `KubeVirt` while I was trying to learn a little bit of `Angular`. Basically this tool uses `kubectl proxy` to proxy API requests to `kubeapiserver`. To handle the `Disk`/`Volume` part, the tool works through [CDI](https://github.com/kubevirt/containerized-data-importer/).

## REQUIREMENTS

Kubevirt featureGate `ExpandDisks` is required.

CDI is required with featureGate `HonorWaitForFirstConsumer` active: 
```
  config:
    featureGates:
    - HonorWaitForFirstConsumer
```

StorageClass features `WaitForFirstConsumer` and `allowVolumeExpansion` are required:
```
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
```

## HOW TO INSTALL IT

### Create the Namespace
```sh
$ kubectl apply -f kubernetes/ns.yaml
```
### Create the Service Account and RBAC
```sh
$ kubectl apply -f kubernetes/rbac.yaml
```
### Create the FrontEnd Deployment
```sh
$ kubectl apply -f kubernetes/deployment.yaml
```
### Create the Priority Classes
```sh
$ kubectl apply -f kubernetes/pc.yaml
```
### Create the FrontEnd Service
```sh
kubectl apply -f kubernetes/service.yaml
```

## HOW TO USE IT

To use the tool, you can either use `kubectl port-forward` on port 8080, use a `Service` with type `NodePort` or `LoadBalancer`, or, create an `Ingress` for your service.  
*Note:* As the tool needs Websocket support, if you are using an `Ingress` make sure you set it up accordingly.

## Screenshot

Dashboard:</br>
<img src="images/screenshot_01.png" width="96%" align="center"/>
Instance List:</br>
<img src="images/screenshot_02.png" width="96%"/>
</br>Instance Info & New Instance </br>
<img src="images/screenshot_03.png" width="46%"/>
<img src="images/screenshot_04.png" width="46%"/>
</br>Instance CPU/Memory & Priority Class </br>
<img src="images/screenshot_06.png" width="46%"/>
<img src="images/screenshot_07.png" width="46%"/>
</br>Disk & Cloud Init:</br>
<img src="images/screenshot_08.png" width="46%"/>
<img src="images/screenshot_11.png" width="46%"/>
</br>VM Pool:</br>
<img src="images/screenshot_15.png" width="96%" align="center"/>
</br>Pool Info & New Pool </br>
<img src="images/screenshot_16.png" width="46%"/>
<img src="images/screenshot_17.png" width="46%"/>
</br>Node & Data Volumes</br>
<img src="images/screenshot_24.png" width="46%"/>
<img src="images/screenshot_25.png" width="46%"/>
</br>Load Balancers:</br>
<img src="images/screenshot_28.png" width="96%" align="center"/>
</br>Load Balancer Info & New Load Balancer</br>
<img src="images/screenshot_29.png" width="46%"/>
<img src="images/screenshot_30.png" width="46%"/>
</br>Instance Type & Networking</br>
<img src="images/screenshot_26.png" width="46%"/>
<img src="images/screenshot_33.png" width="46%"/>
</br>VNC Screen</br>
<img src="images/screenshot_34.png" width="96%" align="center"/>

*Note:* Check `images` directory for more screenshots.

## Building

To build the tool simply run: 
```sh
docker build -t your-repo/kubevirt-manager:version .
docker push your-repo/kubevirt-manager:version
```

## References

1. [Kubernetes](https://kubernetes.io/)
2. [Kubectl](https://kubernetes.io/docs/reference/kubectl/kubectl/)
3. [CDI](https://github.com/kubevirt/containerized-data-importer/)
4. [Kubevirt](https://kubevirt.io)
5. [NodeJS](https://nodejs.org/en/)
6. [Angular](https://angular.io/)
7. [AdminLTE](https://adminlte.io/)
8. [NoVNC](https://github.com/novnc/noVNC)

## License

**kubevirt-manager** is licensed under the [Apache Licence, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).
