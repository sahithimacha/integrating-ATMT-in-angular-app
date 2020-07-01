import {
  Feedback,
  FeedbackEnvironment,
  StyleRoot,
} from "@atmt/feedback-component-web";

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as uuid from "uuid";
import * as invariant from "invariant";

import { Component, Input, OnInit } from "@angular/core";
import { FeedbackLanguage } from "@atmt/feedback-component-web/dist/shared/src/model/feedback.model";

@Component({
  selector: "app-feedback",
  template: '<span [id]="rootDomID"></span>',
})
export class FeedbackComponent implements OnInit {
  @Input() appId: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() environment: FeedbackEnvironment.QA;
  @Input() countryCode: string;
  @Input() storeNumber: number;
  @Input() userId: string;
  @Input() version: string;
  @Input() languageCode: FeedbackLanguage | string;

  private rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): any {
    const {
      appId,
      title,
      subtitle,
      environment,
      countryCode,
      storeNumber,
      userId,
      version,
      languageCode,
    } = this;
    return {
      appId,
      title,
      subtitle,
      environment,
      countryCode,
      storeNumber,
      userId,
      version,
      languageCode,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      const feedback = React.createElement(Feedback, this.getProps());
      ReactDOM.render(
        React.createElement(StyleRoot, { children: [feedback] }),
        this.getRootDomNode()
      );
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}
