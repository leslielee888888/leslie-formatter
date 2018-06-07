import { OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
export declare class FormatterDirective implements OnInit {
    private currencyPipe;
    private uppercasePipe;
    private ref;
    hasChange: boolean;
    INIT: boolean;
    fomatter: any;
    appFormatter: any;
    formatFn: any;
    ngModel: any;
    ngControl: NgControl;
    FOMATTER_MAP: {
        name: string;
        fomatter: (value: string) => any;
        regex: RegExp;
    }[];
    constructor(currencyPipe: CurrencyPipe, uppercasePipe: UpperCasePipe, ngControl: NgControl, ref: ViewContainerRef);
    onFocus(event: any): void;
    onBlur(event: any): void;
    onInput(event: any): void;
    make_formatter(value: any): (f: any) => (fn?: any) => any;
    format(v: any): any;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
