const EventEmitter = require('events');
class cacheHandler extends EventEmitter
{
    parseCachedFiles()
    {
        let procSucess=true,cn=1,data={"files":{}};
        for(let prop in require.cache)
        {
          if(prop.indexOf('/home/node/')==-1 && prop.indexOf('node_modules')==-1)
          {
            let cacheStatus=this.clearCache(prop);
            if(cacheStatus==="success")
            {
                data["files"][cn] = prop;
                cn++;
            }
            else
            {
                data["error"] = cacheStatus;
                procSucess=false;
                break;
            }
        }
      }
        if(procSucess)//cache cleaned successfully..
        {
          console.info(data);
        }
        else//cache cleaning failed
        {
          console.error(data);
        }
    }
    clearCache(filePath)
    {
        try{
            delete require.cache[filePath];
            return "success";
        }
        catch(error)
        {
            return error
        }
    }
}

module.exports = cacheHandler;