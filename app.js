/*jslint node: true */
/*eslint-env node, mocha */

"use strict";

exports.handler = function(event, context){
    var self = this;
    self.event = event;
    console.log(self.event);
    context.done();
};
