import React, { useEffect } from 'react';
import Form, { Field } from '../components/my-rc-field-form/';
import Input from '../components/Input';
const nameRules = { required: true, message: '请输入姓名！' };
const passworRules = { required: true, message: '请输入密码！' };
let count = 0
export default function MyRCFieldForm (props) {
  count++
  console.log(count)

  const [form] = Form.useForm();

  const onFinish = (val) => {
    console.log('onFinish', val); // sy-log
  };

  // 表单校验失败执行
  const onFinishFailed = (val) => {
    console.log('onFinishFailed', val); // sy-log
  };

  useEffect(() => {
    console.log('form', form); // sy-log
    // form.setFieldsValue({ username: 'default' });
    // form.setFieldsValue({ password: 'default' });
  }, []);
  const domRef = null;
  return (
    <div>
      <h3>MyRCFieldForm</h3>
      <Form ref={domRef} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} >
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="input UR Username" />
        </Field>
        <Field name="password" rules={[passworRules]}>
          <Input placeholder="input UR Password" />
        </Field>
        <button>Submit</button>
      </Form>
      <div>{domRef}</div>
    </div>
  );
}

// export default class MyRCFieldForm extends Component {
//   // formRef = React.createRef()
//   // componentDidMount() {
//   //   console.log("form", this.formRef.current);
//   //   this.formRef.current.setFieldsValue({ username: "default" });
//   // }
//   onFinish = (val) => {
//     console.log('onFinish', val); // sy-log
//   };

//   // 表单校验失败执行
//   onFinishFailed = (val) => {
//     console.log('onFinishFailed', val); // sy-log
//   };

//   render () {
//     return (
//       <div>
//         <h3>MyRCFieldForm</h3>
//         <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
//           <Field name="username" rules={[nameRules]}>
//             <Input placeholder="Username" />
//           </Field>
//           <Field name="password" rules={[passworRules]}>
//             <Input placeholder="Password" />
//           </Field>
//           <button>Submit</button>
//         </Form>

//       </div>
//     );
//   }
// }
