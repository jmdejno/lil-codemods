function hello() {
  const { whyNot } = this.getProperties("whyNot");
  const { okay: ok } = this.getProperties("okay");
}
