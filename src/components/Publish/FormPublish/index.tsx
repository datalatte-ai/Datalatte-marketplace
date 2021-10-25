import React, { ReactElement, FormEvent } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useFormikContext, Form, FormikContextType } from 'formik'
import FormActions from './FormActions'
import { FormPublishData } from '../_types'
import styles from './index.module.css'
import { initialValues } from '../_constants'
import Tabs from '@shared/atoms/Tabs'
import PricingFields from './Pricing'
import Debug from '../Debug'
import MetadataFields from './Metadata'
import ServicesFields from './Services'

const query = graphql`
  query {
    content: publishJson {
      metadata {
        title
      }
      services {
        title
      }
      pricing {
        title
      }
      warning
    }
  }
`

export default function FormPublish(): ReactElement {
  const { content } = useStaticQuery(query)

  const { isValid, values, resetForm }: FormikContextType<FormPublishData> =
    useFormikContext()

  // reset form validation on every mount
  // useEffect(() => {
  //   setErrors({})
  //   setTouched({})

  //   // setSubmitting(false)
  // }, [setErrors, setTouched])

  const resetFormAndClearStorage = (e: FormEvent<Element>) => {
    e.preventDefault()

    resetForm({
      values: initialValues as FormPublishData,
      status: 'empty'
    })
  }

  const tabs = [
    {
      title: content.metadata.title,
      content: (
        <>
          <MetadataFields />
          <FormActions
            isValid={isValid}
            resetFormAndClearStorage={resetFormAndClearStorage}
          />
        </>
      )
    },
    {
      title: content.services.title,
      content: (
        <>
          <ServicesFields />
          <FormActions
            isValid={isValid}
            resetFormAndClearStorage={resetFormAndClearStorage}
          />
        </>
      )
    },
    {
      title: content.pricing.title,
      content: (
        <>
          <PricingFields />
          <FormActions
            isValid={isValid}
            resetFormAndClearStorage={resetFormAndClearStorage}
          />
        </>
      )
    }
  ]

  return (
    <>
      <Form className={styles.form}>
        <Tabs items={tabs} />
      </Form>
      <Debug values={values} />
    </>
  )
}
