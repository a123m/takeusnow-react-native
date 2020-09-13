const Globals = {
  PostProject: {
    categoryId: 0,
    title: '',
    detail: '',
    state: 0,
    city: 0,
    budget: '',
    reqOn: '',
    validity: '',
    status: 'ACTIVE',
    type: '',
    skills: [],
  },
  clearPostProject() {
    this.PostProject = {
      categoryId: 0,
      title: '',
      detail: '',
      state: 0,
      city: 0,
      budget: '',
      reqOn: '',
      validity: '',
      status: 'ACTIVE',
      type: '',
      skills: [],
    };
  },
};

export default Globals;
