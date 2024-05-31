#### requestObject
|    key    |                       value                      |      requirement      |
|:---------:|:------------------------------------------------:|:---------------------:|
| method    |                     GET/POST                     | optional(default:GET) |
| url       |                  service request                 |       mandatory       |
| body      |                        {}                        |  mandatory(for POST)  |
|  timeout  |                  8000s(default)                  |        optional       |
| headers   | object eg.{  "Content-type" :  "application/json"  } | optional              |
| ontimeout |                   function(xhr)                  |        optional       |
| onload    |                   function(xhr)                  |        optional       |
| onerror   |                   function(xhr)                  |        optional       |

### Resolved Promise-dataRequest:{status:X,statusText:Y,response:Z} 
|  status  |  statusText  |           response          |
|:--------:|:------------:|:---------------------------:|
| 100– 199 |     info     | undefined  |
| 200      |    ok        |              JSON-parsed Response             |
| 201– 299 |    success   |              JSON-parsed Response             |
| 400– 499 | client-error |              undefined             |
| 500– 599 | server-error |              undefined             |

### Rejected Promise-dataRequest:{status:X,statusText:Y,response:Z} 
|  status  |  statusText  |           response          |
|:--------:|:------------:|:---------------------------:|
| error |     some connection error     | undefined |
| service-timeout |    undefined   |              undefined             |

