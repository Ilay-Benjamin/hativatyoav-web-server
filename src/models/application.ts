import { ProjectBasics, ProjectAppCore, ProjectInstance } from "./project";




export class ApplicationBasics {
     private name: string;
     private description: string;
     constructor(name: string, description: string = "") {
          this.description = description;
          this.name = name;
     }
     getName() { return this.name; }
     getDescription() { return this.description; }
     setName(name: string) { this.name = name; }
     setDescription(description: string) { this.description = description; }
}



export class TrackedApplication extends ApplicationBasics {
     private id: string;
     private index: number;
     private project: null|ProjectBasics;
     _addToProject(project: ProjectBasics, id: string, index: number) {
          if (!project || !(project instanceof ProjectBasics) || id === null || index === null || index < 0) { return false; }
          this.id = id;
          this.index = index;
          this.project = project;
     }
     assign(project: ProjectBasics, id: string, index: number) {
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
     constructor(name: string, description: string = "") {
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



export class ApplicationInstance extends TrackedApplication {
     assign(project: ProjectBasics, id: string, index: number) {
          if ( index < 0) { return false; }
          if (this.isAssigned()) { return false; }
          super.assign(project, id, index);
     }
     unassign() {
          if (!this.isAssigned()) { return false; }
          super.unassign();
     }
     constructor(name: string, description: string = "") {
          super(name, description);
     }
}


