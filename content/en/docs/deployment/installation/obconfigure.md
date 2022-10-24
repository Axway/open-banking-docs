---
title: "obconfigure"
linkTitle: "obconfigure"
weight: 4
---
Build and execution of the obconfigure CLI tool for the Axway Open Banking solution.
https://git.ecd.axway.org/medici/common/obconfigure

## Building the tool on Linux

It is recommended to create the binary using GraalVM's native-image on Linux.

1) Download GraalVM
```bash
https://github.com/graalvm/graalvm-ce-builds/releases
```
2) Extract and configure GraalVM JRE.
```bash
tar -xzf graalvm-ce-java11-linux-amd64-22.2.0.tar.gz
export PATH=/path/to/graalvm/graalvm-ce-java11-22.2.0/bin:$PATH
export JAVA_HOME=/path/to/graalvm/graalvm-ce-java11-22.2.0/
```

3) Check that the Java version is OK:
```bash
java -version
```

4) Install dependencies:
```bash
gu install native-image
sudo apt-get install libc6-dev
sudo apt install zlib1g-dev
```

5) Package the application with Maven
```bash
mvn clean package
```

The binary will be generated under /target folder.

## Building the tool on Windows 10

1) Download GraalVM
```bash
https://github.com/graalvm/graalvm-ce-builds/releases
```
2) Configure GraalVM.
```bash
setx /M PATH "C:\Program Files\Java\graalvm-ce-java11-22.2.0\bin;%PATH%"
setx /M JAVA_HOME "C:\Program Files\Java\graalvm-ce-java11-22.2.0"
```
3) Check that the Java version is OK:
```bash
java -version
```
4) Install dependencies:
```bash
gu install native-image
```
5) As a GraalVM workaround on Windows, copy the
```bash
<GRAAVM_HOME>\lib\svm\bin\native-image.exe
to
><GRAAVM_HOME>\bin
```

6) Install Visual Studio Build Tools and Windows 10 SDK. You can use Visual Studio 2017 version 15.9 or later.
- Download the Visual Studio Build Tools (C development environment) from visualstudio.microsoft.com.
- Start the Visual Studio Build Tools installation by clicking on the .exe file, and then press Continue.
- Check the Desktop development with C++ box in the main window. Also, on the right side under Installation Details, choose Windows 10 SDK, and click the Install button.
- After the installation completes, reboot your system.
- Next, if you have Visual Studio 2019 installed, you will need to ensure Windows 10 SDK is available too.
- Open the Visual Studio Installer.
- Under the Installed tab, click Modify and choose Individual Components.
- Then scroll to the bottom and check if Windows 10 SDK is installed and confirm the build tools are installed.
- Now that you have the Windows 10 SDK and Visual Studio tooling installed, you can start using GraalVM Native Image.

7) Package the application with Maven

On Windows, the native-image builder will only work when it’s executed from the x64 Native Tools Command Prompt.
The command for initiating an x64 Native Tools command prompt is different if you only have the Visual Studio Build Tools installed, versus if you have the full VS Code 2019 installed.

Use this command if you have the Visual Studio Build Tools installed:
```bash
C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC\Auxiliary\Build\vcvars64.bat
```
And use this command if you installed the full VS Code 2019:
```bash
C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\Common7\Tools\vcvars64.bat
```

Then within the correct command prompt, execute the below maven command.

>mvn clean package

The .exe will be generated under /target folder.

Windows instructions were obtained from the following link:
```bash
https://medium.com/graalvm/using-graalvm-and-native-image-on-windows-10-9954dc071311
```

Thanks to the author of the article.

## Installation package

The installation package of the obconfigure tool contains the following files:

```bash
/obconfigure  
&emsp;&emsp;obconfigure (binary) 
&emsp;&emsp;values.master.yaml  
&emsp;&emsp;mappings.yaml
```

The application requires 2 files to be located at the same package as the binary.
```bash
values.master.yaml
```

This YAML file is divided in two important parts:
1) target-values-config property, that must contain the paths to the target values.yaml for processing (values
   property), the paths to the Chart.yaml (needed for version checking) and whether a component will be processed or not (enabled property)
2) the values which will be copied for each component.

The version property in the Chart.yaml will be compared with the global.helm-chart-version property in the
values.master.yaml file. If they don't match the tool execution will be interrupted. If the Chart.yaml path is not
provided of if there is no version provided in the file, no version check will be performed.

```bash
mappings.yaml
```

This YAML file must contain the mappings for the properties, grouped by component. The properties in the right are
the source ones from the values.master.yaml file, while the left ones are the target properties which will be
updated in the corresponding values.yaml files for each component.

## Running the tool

The environment must be provided in the property 'global.env' of the values.master.yaml file. Also, the values in the
values.master.yaml must be adjusted accordingly, as they may vary with the environment.

"prod" and "prd" will be considered as PROD (production) values.

When PROD is in use, the following property(ies) will be ignored:
```bash
demoapp
```

Finally, just execute the binary.

```bash
./obconfigure
```

## mappings.yaml syntax

Besides simple mappings, the mappings.yaml accepts some operations over the values that will be set to the target
paths. Please find below a list of all operations an user can make.

1) Simple mappings:
```bash
accountsbr_v2.name: obbrPhase2V2.accountsbrV2.name
```

The value from the path in the right (obbrPhase2V2.accountsbrV2.name from the master file) will simply be set to
path in the left (accountsbr_v2.name from the target values.yaml file).

2) Passing simple constants:
```bash
accountsbr_v2.name: (some constant)
```

The values between '()' are constant Strings, and they can be simply passed as values.

3) Mapping with concatenation:
```bash
griffin.tokenEndpoint: (https://) + acp.ingressName + (.) + global.domainName + (/default/openbanking_brasil/oauth2/token)
```

Constant Strings can also be concatenated with properties from the master to produce a
final value. For example, consider that acp.ingressName: "something" and global.domainName: "anything", the result
from the above concatenation will be "https://something.anything/default/openbanking_brasil/oauth2/token"

4) AND (&&) boolean operations:
```bash
oauth.ingressEnabled: oauth.enable && oauth.ingressEnabled
backends.accountsBr_v2.disabled: not (obbrPhase2.enable && obbrPhase2.accountsbr.enable)
```

Boolean properties can be used in AND operations using &&. The result can also be negated using the keyword "not"
followed by an operation inside brackets.

5) OR (||) operations for String assignment:
```bash
global.apiDomain: (https://) + apitraffic.ingressName + (.) + (global.externalDomainName || global.domainName)
```

Sometimes we may want to assign one of two or more values, whichever is present first. This can be done using the OR
operation. If global.externalDomainName is present then it will be used in the final concatenation. If not, then
global.domainName will be evaluated.

6) Adding line breaks with <ADD_LINE_BREAK>
```bash
global.dockerRegistry.token: global.dockerRegistry.token + <ADD_LINE_BREAK>
```

If a line break is desired after a property in the YAML file, just concatenate the 'ADD_LINE_BREAK' to the end of
the mapping. This is not needed for certificates (in most of the cases), as the tool will identify the end of the
certificate by the "-----END" token. If you are not sure if this token will be present, just add the <ADD_LINE_BREAK>.