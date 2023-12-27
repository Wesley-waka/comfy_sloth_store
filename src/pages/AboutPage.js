import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return <main>
    <PageHero title='about' />
    <Wrapper className='page section section-center'>
      <img src={aboutImg} alt='nice desk' />
      <article>
        <div className='title'>
          <h2>our story</h2>
          <div className='underline'></div>
        </div>
        <p>
        At Comfy Sloth Store, we believe in the power of furniture to transform spaces and lives. Our collection is a carefully curated symphony of design, comfort, and functionality. Whether you're searching for a statement piece to redefine your living room or seeking a cozy corner to unwind, our furniture speaks to your desires. Indulge in the seamless integration of style and practicality, and let your living spaces reflect the unique tapestry of your personality
        </p>
      </article>
    </Wrapper>
  </main>
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
