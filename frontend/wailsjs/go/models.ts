export namespace projects {
	
	export class MetaData {
	    Name: string;
	    Path: string;
	    Type: string;
	    ModifiedDate: number;
	
	    static createFrom(source: any = {}) {
	        return new MetaData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Path = source["Path"];
	        this.Type = source["Type"];
	        this.ModifiedDate = source["ModifiedDate"];
	    }
	}

}

