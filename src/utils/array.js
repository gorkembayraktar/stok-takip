Array.prototype.getSumDuplicateData = function(key, sumKey){
    const result = [];
    this.forEach(function(a){
        if (!this[ a[ key ] ]) {
            this[ a[ key ] ] = { ...a, [sumKey]: 0 };
            result.push(this[a[ key ]]);
        }
        this[a[ key ]][sumKey] += a[sumKey];
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