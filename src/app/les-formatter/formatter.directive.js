"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var FormatterDirective = (function () {
    function FormatterDirective(currencyPipe, uppercasePipe, ngControl, ref) {
        var _this = this;
        this.currencyPipe = currencyPipe;
        this.uppercasePipe = uppercasePipe;
        this.ref = ref;
        this.hasChange = false;
        this.INIT = true;
        this.FOMATTER_MAP = [
            {
                name: 'phone',
                fomatter: function (val) {
                    var value = val.replace(/[^0-9]/, '');
                    if (value) {
                        if (value.match(/^\b04/)) {
                            return value.replace(/^([0-9]{4}) ?([0-9]{3}) ?([0-9]{3}).*$/, '$1 $2 $3');
                        }
                        else if (value.match(/^\b0/)) {
                            return value.replace(/^([0-9]{2}) ?([0-9]{4}) ?([0-9]{4}).*$/, '$1 $2 $3');
                        }
                        else if (value.match(/^[1-9][0-9 ]{7}/)) {
                            return value.replace(/^([1-9][0-9]{3}) ?([0-9]{4}).*$/, '$1 $2');
                        }
                    }
                    return value;
                },
                regex: /^(\d{4} \d{3} \d{3}|\d{2} \d{4} \d{4}|\d{4} \d{4})?$/
            },
            {
                name: 'currency',
                fomatter: function (value) {
                    var rs = value && value.replace(/[^0-9]/g, '');
                    if (rs && /^[0-9]+$/.test(rs) && _this.currencyPipe) {
                        rs = _this.currencyPipe.transform(rs, ' ', 'symbol', '0.0');
                        if (rs) {
                            return rs.trim();
                        }
                        else {
                            return rs;
                        }
                    }
                    return rs;
                },
                regex: /^[0-9,]{1,}$/
            },
            {
                name: 'name',
                fomatter: function (value) {
                    var rs = value && value.replace(/[^A-Za-z ]/g, '');
                    if (rs && /^[A-Za-z]+$/.test(rs)) {
                        return rs.replace(/^([a-z])/, function ($1) { return $1.toUpperCase(); });
                    }
                    return rs;
                },
                regex: /^[A-Za-z]{1,}$/
            },
            {
                name: 'fullname',
                fomatter: function (value) {
                    var rs = value && value.replace(/[^A-Za-z ]/g, '');
                    if (rs) {
                        return rs.replace(/\b\w/g, function (l) { return l.toUpperCase(); });
                    }
                    return rs;
                },
                regex: /^[A-Za-z]{1,}$/
            },
            {
                name: 'abn',
                fomatter: function (value) {
                    var rs = value.replace(/[^0-9 ]/g, '').trim();
                    if (rs) {
                        if (/^[0-9]{3} ?[0-9]{3} ?[0-9]{3}$/.test(rs)) {
                            return rs.replace(/([0-9]{3}) ?([0-9]{3}) ?([0-9]{3})/, '$1 $2 $3').trim();
                        }
                        else {
                            return rs.replace(/[ ]/g, '').replace(/([0-9]{2}) ?([0-9]{3}) ?([0-9]{3}) ?([0-9]{3}).*/, '$1 $2 $3 $4').trim();
                        }
                    }
                    return rs;
                },
                regex: /^[0-9 ]+$/
            }
        ];
        this.ngControl = ngControl;
    }
    FormatterDirective.prototype.onFocus = function (event) {
        if (this.ngControl.control) {
            this.ngControl.control.markAsPending();
        }
    };
    FormatterDirective.prototype.onBlur = function (event) {
        if (this.hasChange && this.ngControl.control) {
            this.ngControl.control.updateValueAndValidity();
        }
    };
    FormatterDirective.prototype.onInput = function (event) {
        if (this.fomatter && this.ngControl.control) {
            var v = this.format(event.target.value);
            this.ngControl.control.patchValue(v);
        }
        this.hasChange = true;
    };
    FormatterDirective.prototype.make_formatter = function (value) {
        return function (f) {
            return function (fn) { return fn ? fn(value) : f(value); };
        };
    };
    FormatterDirective.prototype.format = function (v) {
        var fn = this.make_formatter(v)(this.fomatter.fomatter);
        return fn(this.formatFn);
    };
    FormatterDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.fomatter = this.FOMATTER_MAP.find(function (r) { return r.name === _this.appFormatter; });
    };
    FormatterDirective.prototype.ngOnChanges = function (changes) {
        if (changes && this.fomatter && changes.ngModel && changes.ngModel.currentValue && this.INIT) {
            this.ref.element.nativeElement.value = this.format(changes.ngModel.currentValue);
            this.INIT = false;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FormatterDirective.prototype, "appFormatter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FormatterDirective.prototype, "formatFn", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FormatterDirective.prototype, "ngModel", void 0);
    __decorate([
        core_1.HostListener('focus', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FormatterDirective.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('blur', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FormatterDirective.prototype, "onBlur", null);
    __decorate([
        core_1.HostListener('input', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FormatterDirective.prototype, "onInput", null);
    FormatterDirective = __decorate([
        core_1.Directive({
            selector: '[appFormatter]',
            providers: [common_1.CurrencyPipe, common_1.UpperCasePipe]
        }),
        __param(2, core_1.Host()),
        __metadata("design:paramtypes", [common_1.CurrencyPipe, common_1.UpperCasePipe,
            forms_1.NgControl, core_1.ViewContainerRef])
    ], FormatterDirective);
    return FormatterDirective;
}());
exports.FormatterDirective = FormatterDirective;
//# sourceMappingURL=formatter.directive.js.map