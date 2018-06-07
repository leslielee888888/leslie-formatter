"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var formatter_directive_1 = require("./formatter.directive");
var LesFormatterModule = (function () {
    function LesFormatterModule() {
    }
    LesFormatterModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                formatter_directive_1.FormatterDirective
            ],
            exports: [
                formatter_directive_1.FormatterDirective
            ]
        })
    ], LesFormatterModule);
    return LesFormatterModule;
}());
exports.LesFormatterModule = LesFormatterModule;
//# sourceMappingURL=les-formatter.module.js.map