import React from 'react';
import '../../assets/styles/notfound.scss';

/*
 * Notfound Component
 *
 *@return {js} to display Notfound page
 */
const Notfound = () => (
  <section id="title">
    <div className="circles">
      <p>
        404
        <br />
        <small>PAGE NOT FOUND</small>
      </p>
      <span className="circle big" />
      <span className="circle med" />
      <span className="circle small" />
    </div>
  </section>
);

export default Notfound;
