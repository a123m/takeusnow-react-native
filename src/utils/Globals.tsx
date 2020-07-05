let Globals: globals = {
  PostProject: {
    title: '',
    detail: '',
    category: '',
    state: '',
    city: '',
    budget: '',
    validity: '',
    status: 'created',
    type: '',
    skills: []
  },
  clearPostProject() {
    for (let i in this.PostProject) {
      this.PostProject[i] = '';
    }
  }
};

export default Globals;

interface globals {
  PostProject: postProject;
  clearPostProject: any;
}

interface postProject {
  title: string;
  detail: string;
  category: string;
  state: string;
  city: string;
  budget: string;
  validity: string | Date | number;
  status: string;
  type: string;
  skills: Array<string | object>;
}
