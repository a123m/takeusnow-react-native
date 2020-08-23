const Globals: globals | any = {
  PostProject: {
    categoryId: 0,
    title: '',
    detail: '',
    state: '',
    city: '',
    budget: '',
    validity: '',
    status: 'ACTIVE',
    type: '',
    skills: [],
  },
  clearPostProject() {
    for (let i in this.PostProject) {
      this.PostProject[i] = '';
    }
  },
};

export default Globals;

interface globals {
  PostProject: postProject;
  clearPostProject: any;
}

interface postProject {
  categoryId: number;
  title: string;
  detail: string;
  state: string;
  city: string;
  budget: string;
  validity: string | Date | number;
  status: string;
  type: string;
  skills: Array<string | object>;
}
