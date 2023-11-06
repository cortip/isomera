import styles from './page.module.scss'
import Image from 'next/image'
import LogoSVG from '../assets/logo.svg'

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Image src={LogoSVG} alt="Isomera" />
        <a
          className={styles.linkToRepo}
          href="https://github.com/cortip/isomera#isomera-the-ultimate-javascripttypescript-saas-boilerplate-monorepo-for-modern-developers"
          target="_blank"
        >
          <h1 className={styles.headline}>
            The Ultimate Javascript/Typescript SaaS Boilerplate Monorepo for
            Modern Developers
          </h1>
        </a>
      </div>
    </div>
  )
}
