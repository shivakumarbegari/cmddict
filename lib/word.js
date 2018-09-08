var Word = module.exports = function(response){
    this.results = response.results;
    this.lexicalEntries = response.results.length>0?response.results[0].lexicalEntries:[];
}

Word.prototype["getdefinitions"] = function(){
    var rtnObj = {};
    if(this.lexicalEntries.length>0){
        if(this.lexicalEntries.length>0){
            this.lexicalEntries.forEach((element,index1) => {
                var tmparr = [];
                var entries = element.entries;
                if(entries!=null && entries.length>0){
                    entries.forEach((entry,index2)=>{
                        if(entry.senses!=null && entry.senses.length>0){
                            entry.senses.forEach((sense,index3)=>{
                                if(sense.definitions!=null && sense.definitions.length>0){
                                    sense.definitions.forEach((def,index4)=>{
                                        // console.log(tmpobj);
                                        tmparr.push(def);
                                    });
                                }
                            });
                        }
                    });
                }
                if(tmparr.length>0){
                    rtnObj[element.lexicalCategory] = tmparr;
                }
            });
        }
    }
    if(Object.keys(rtnObj).length>0){
        return rtnObj;
    }
    return null;
}
Word.prototype["getsynonyms"] = function(){
    var rtnObj = {};
    if(this.lexicalEntries.length>0){
        if(this.lexicalEntries.length>0){
            this.lexicalEntries.forEach((element,index1) => {
                var tmparr = [];
                var entries = element.entries;
                if(entries!=null && entries.length>0){
                    entries.forEach((entry,index2)=>{
                        if(entry.senses!=null && entry.senses.length>0){
                            entry.senses.forEach((sense,index3)=>{
                                if(sense.synonyms!=null && sense.synonyms.length>0){
                                    sense.synonyms.forEach((sy,index4)=>{
                                        // console.log(tmpobj);
                                        if(sy.text!=null && sy.text.indexOf(" ")<0 && sy.text.indexOf("_")<0){
                                            tmparr.push(sy.text);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                if(tmparr.length>0){
                    rtnObj[element.lexicalCategory] = tmparr;
                }
            });
        }
    }
    if(Object.keys(rtnObj).length>0){
        return rtnObj;
    }
    return null;
}
Word.prototype["getantonyms"] = function(){
    var rtnObj = {};
    if(this.lexicalEntries.length>0){
        if(this.lexicalEntries.length>0){
            this.lexicalEntries.forEach((element,index1) => {
                var tmparr = [];
                var entries = element.entries;
                if(entries!=null && entries.length>0){
                    entries.forEach((entry,index2)=>{
                        if(entry.senses!=null && entry.senses.length>0){
                            entry.senses.forEach((sense,index3)=>{
                                if(sense.antonyms!=null && sense.antonyms.length>0){
                                    sense.antonyms.forEach((an,index4)=>{
                                        // console.log(tmpobj);
                                        if(an.text!=null && an.text.indexOf(" ")<0 && an.text.indexOf("_")<0){
                                            tmparr.push(an.text);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                if(tmparr.length>0){
                    rtnObj[element.lexicalCategory] = tmparr;
                }
            });
        }
    }
    if(Object.keys(rtnObj).length>0){
        return rtnObj;
    }
    return null;
}
Word.prototype["getexamples"] = function(){
    var rtnObj = {};
    if(this.lexicalEntries.length>0){
        if(this.lexicalEntries.length>0){
            this.lexicalEntries.forEach((element,index1) => {
                var tmparr = [];
                var entries = element.entries;
                if(entries!=null && entries.length>0){
                    entries.forEach((entry,index2)=>{
                        if(entry.senses!=null && entry.senses.length>0){
                            entry.senses.forEach((sense,index3)=>{
                                if(sense.examples!=null && sense.examples.length>0){
                                    sense.examples.forEach((ex,index4)=>{
                                        // console.log(tmpobj);
                                        if(ex.text!=null){
                                            tmparr.push(ex.text);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                if(tmparr.length>0){
                    rtnObj[element.lexicalCategory] = tmparr;
                }
            });
        }
    }
    if(Object.keys(rtnObj).length>0){
        return rtnObj;
    }
    return null;
}