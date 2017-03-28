export class MdPagination {

  get begin() {
    return this.end + 1 - this.size;
  }

  get end() {
    return (this.page * this.size) - 1;
  }

  constructor(public page, public size) { }
}
