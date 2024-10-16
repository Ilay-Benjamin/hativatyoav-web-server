"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationInstance = exports.TrackedApplication = exports.ApplicationBasics = void 0;
const project_1 = require("./project");
class ApplicationBasics {
    constructor(name, description = "") {
        this.description = description;
        this.name = name;
    }
    getName() { return this.name; }
    getDescription() { return this.description; }
    setName(name) { this.name = name; }
    setDescription(description) { this.description = description; }
}
exports.ApplicationBasics = ApplicationBasics;
class TrackedApplication extends ApplicationBasics {
    _addToProject(project, id, index) {
        if (!project || !(project instanceof project_1.ProjectBasics) || id === null || index === null || index < 0) {
            return false;
        }
        this.id = id;
        this.index = index;
        this.project = project;
    }
    assign(project, id, index) {
        return this._addToProject(project, id, index);
    }
    _removeFromProject() {
        this.id = "";
        this.index = -1;
        this.project = null;
    }
    unassign() {
        this._removeFromProject();
    }
    constructor(name, description = "") {
        super(name, description);
        this.id = "";
        this.index = -1;
        this.project = null;
    }
    getId() { return this.id; }
    getIndex() { return this.index; }
    getProject() { return this.project; }
    _isAddedToProject() { return this.id !== "" && this.project && this.index >= 0; }
    isAssigned() { return this._isAddedToProject(); }
}
exports.TrackedApplication = TrackedApplication;
class ApplicationInstance extends TrackedApplication {
    assign(project, id, index) {
        if (index < 0) {
            return false;
        }
        if (this.isAssigned()) {
            return false;
        }
        super.assign(project, id, index);
    }
    unassign() {
        if (!this.isAssigned()) {
            return false;
        }
        super.unassign();
    }
    constructor(name, description = "") {
        super(name, description);
    }
}
exports.ApplicationInstance = ApplicationInstance;
