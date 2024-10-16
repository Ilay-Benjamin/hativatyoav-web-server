const project = require('./Project');
const application = require('./Application');




class ProjcetRegistry {
     static #occupiedIds = [];
     static #discardedIds = [];
     static #projects = [];

     static #lastNumber = 0;
     static #lastId = "";
     static #uniqueIdSeed = "";

     constructor() {  /* No need for constructor. It's empty and does nothing by default */ }

     static addProject(project) {
          if (this.#takenIds.includes(project.id)) {
               throw new Error(`Project with id ${project.id} already exists`);
          }
          this.#projects.push(project);
          this.#takenIds.push(project.id);
     }

     static removeProject(project) {
          this.#projects.pop(project);
          this.#takenIds.pop(project.id);
     }
}








class 


