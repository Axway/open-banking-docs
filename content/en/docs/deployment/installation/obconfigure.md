---
title: "Obconfigure CLI tool"
linkTitle: "Obconfigure CLI tool"
weight: 8
---
Obconfigure is a Linux and Windows CLI tool for reading a master YAML file and copying the values into the target YAML files.

## Compatibility

Obconfigure was tested in Windows 10, Linux Mint 21 and Amazon Linux 2. It should run without problems in other 
distributions as well.

## Tool package

The obconfigure package tool contains the following files:

```bash
/obconfigure  
   obconfigure (executable) 
   values.master.yaml  
   mappings.yaml
```

The application requires two files to be located at the same package as the executable.

```bash
values.master.yaml
```

This YAML file is divided in two important parts:

1. target-values-config property, that must contain the paths to the target `values.yaml` for processing (values
   property), the paths to the `Chart.yaml` (needed for version checking) and whether a component will be processed or not (enabled property).
2. the values which will be copied for each component.

The version property in the `Chart.yaml` is compared with the global.helm-chart-version property in the
`values.master.yaml` file. If they do not match the tool execution is interrupted. If the `Chart.yaml` path is not
provided or if there is no version provided in the file, no version check is performed.

```bash
mappings.yaml
```

This YAML file must contain the mappings for the properties, grouped by component. The properties in the right are
the source ones from the `values.master.yaml` file, while the left ones are the target properties which are
updated in the corresponding `values.yaml` files for each component.

## Running the tool

The environment must be provided in the property 'global.env' of the `values.master.yaml` file. Also, the values in the
`values.master.yaml` must be adjusted accordingly, as they may vary with the environment.

"prod" and "prd" will be considered as PROD (production) values.

When PROD is in use, the following property(ies) are ignored:

```bash
demoapp
```

Finally, just execute it.

```bash
Linux: ./obconfigure
Windows: obconfigure.exe
```

## Mappings.yaml syntax

Besides simple mappings, the `mappings.yaml` accepts some operations over the values that are set to the target
paths. Please find below a list of all operations a user can make.

1. Simple mappings.

   ```bash
   accountsbr_v2.name: obbrPhase2V2.accountsbrV2.name
   ```

   The value from the path in the right (obbrPhase2V2.accountsbrV2.name from the master file) will be set to the
   path in the left (accountsbr_v2.name from the target `values.yaml` file).

2. Passing simple constants.

   ```bash
   accountsbr_v2.name: (some constant)
   ```

   The values between '()' are constant Strings, and they can be passed as values.

3. Mapping with concatenation.

   ```bash
   griffin.tokenEndpoint: (https://) + acp.ingressName + (.) + global.domainName + (/default/openbanking_brasil/oauth2/token)
   ```

   Constant Strings can also be concatenated with properties from the master to produce a
   final value. For example, consider that acp.ingressName: "something" and global.domainName: "anything", the result
   from the above concatenation will be "https://something.anything/default/openbanking_brasil/oauth2/token".

4. AND (&&) boolean operations.

   ```bash
   oauth.ingressEnabled: oauth.enable && oauth.ingressEnabled
   backends.accountsBr_v2.disabled: not (obbrPhase2.enable && obbrPhase2.accountsbr.enable)
   ```

   Boolean properties can be used in AND operations using &&. The result can also be negated using the keyword "not"
   followed by an operation inside brackets.

5. OR (||) operations for String assignment.

   ```bash
   global.apiDomain: (https://) + apitraffic.ingressName + (.) + (global.externalDomainName || global.domainName)
   ```

   Sometimes we may want to assign one of two or more values, whichever is present first. This can be done using the OR
   operation. If global.externalDomainName is present then it will be used in the final concatenation. If not, then
   global.domainName will be evaluated.

6. Adding line breaks with <ADD_LINE_BREAK>.

   ```bash
   global.dockerRegistry.token: global.dockerRegistry.token + <ADD_LINE_BREAK>
   ```

   If a line break is desired after a property in the YAML file, just concatenate the 'ADD_LINE_BREAK' to the end of
   the mapping. This is not needed for certificates (in most of the cases), as the tool identifies the end of the
   certificate by the "-----END" token. If you are not sure if this token will be present, just add the <ADD_LINE_BREAK>.
