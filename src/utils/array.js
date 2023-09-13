Array.prototype.getSumDuplicateData = function(key, sumKey){
   // if(!(sumKey instanceof Array)) sumKey = [sumKey];
    const result = [];
    this.forEach(function(a){
        if (!this[ a[ key ] ]) {
            this[ a[ key ] ] = { ...a };
            sumKey.forEach(sk =>{
                this [a [key] ][sk] = 0;
            });
            result.push(this[a[ key ]]);
        }
        sumKey.forEach(sk =>{
            this[a[ key ]][sk] += a[sk];
        });
    }, Object.create(null));
    return result;
}


Array.prototype.joinDuplicateData = function(key, joinKey){
    const result = [];
    this.forEach(function(a){
        if (!this[ a[ key ] ]) {
            this[ a[ key ] ] = { ...a, [joinKey]: [] };
            result.push(this[a[ key ]]);
        }
        this[a[ key ]][joinKey].push( a[joinKey] )
    }, Object.create(null));
    return result;
}