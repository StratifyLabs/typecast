

function Output(type, content){
    this.id = Date.now();
    this.type = type;
    this.content = content;
}

export default Output;