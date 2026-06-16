import { Input, Textarea } from '../Input';
import { SectionBlock } from './SectionBlock';

function GroupLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-para-sm)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-secondary-text)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
    }}>
      {children}
    </span>
  );
}

const COL_W = 240;
const ROW_LABEL_W = 90;
const cellPad: React.CSSProperties = { padding: 'var(--space-4)', verticalAlign: 'top' };

export function InputSection() {
  return (
    <SectionBlock title="Inputs">

      {/* ── Single-line input states ── */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Input — States
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 'var(--space-8)' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr>
              <th style={{ width: ROW_LABEL_W, ...cellPad, textAlign: 'left' }} />
              <th style={{ width: COL_W, ...cellPad, textAlign: 'left' }}><GroupLabel>Default</GroupLabel></th>
              <th style={{ width: COL_W, ...cellPad, textAlign: 'left' }}><GroupLabel>Focused</GroupLabel></th>
              <th style={{ width: COL_W, ...cellPad, textAlign: 'left' }}><GroupLabel>Error</GroupLabel></th>
              <th style={{ width: COL_W, ...cellPad, textAlign: 'left' }}><GroupLabel>Disabled</GroupLabel></th>
            </tr>
          </thead>
          <tbody>
            {/* With label */}
            <tr style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
              <td style={{ ...cellPad, paddingTop: 'var(--space-5)' }}>
                <GroupLabel>With label</GroupLabel>
              </td>
              <td style={cellPad}>
                <Input
                  label="Label"
                  placeholder="Hint Text"
                  state="default"
                  style={{ width: 200 }}
                />
              </td>
              <td style={cellPad}>
                {/* autoFocus to demonstrate focus state */}
                <Input
                  label="Label"
                  placeholder="Hint Text"
                  state="default"
                  defaultValue="Focused"
                  style={{ width: 200 }}
                />
              </td>
              <td style={cellPad}>
                <Input
                  label="Label"
                  placeholder="Hint Text"
                  state="error"
                  defaultValue="Error value"
                  errorMessage="Sample error message"
                  style={{ width: 200 }}
                />
              </td>
              <td style={cellPad}>
                <Input
                  label="Label"
                  placeholder="Hint Text"
                  state="disabled"
                  style={{ width: 200 }}
                />
              </td>
            </tr>

            {/* Without label */}
            <tr style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
              <td style={{ ...cellPad, paddingTop: 'var(--space-5)' }}>
                <GroupLabel>No label</GroupLabel>
              </td>
              <td style={cellPad}>
                <Input placeholder="Hint Text" state="default" style={{ width: 200 }} />
              </td>
              <td style={cellPad}>
                <Input placeholder="Hint Text" state="default" defaultValue="Focused" style={{ width: 200 }} />
              </td>
              <td style={cellPad}>
                <Input
                  placeholder="Hint Text"
                  state="error"
                  defaultValue="Error value"
                  errorMessage="Sample error message"
                  style={{ width: 200 }}
                />
              </td>
              <td style={cellPad}>
                <Input placeholder="Hint Text" state="disabled" style={{ width: 200 }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Trailing icons ── */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Input — Trailing Icons
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
        <Input
          label="Dropdown"
          placeholder="Hint Text"
          trailingIcon="dropdown"
          style={{ width: 240 }}
        />
        <Input
          label="Number Stepper"
          placeholder="Hint Text"
          trailingIcon="stepper"
          style={{ width: 240 }}
        />
        <Input
          label="Password"
          placeholder="Hint Text"
          type="password"
          trailingIcon="eye"
          defaultValue="secret123"
          style={{ width: 240 }}
        />
      </div>

      {/* ── Textarea states ── */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Textarea — States
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        <Textarea
          label="Default"
          placeholder="Hint text for Textarea"
          state="default"
          style={{ width: 320 }}
        />
        <Textarea
          label="Focused"
          defaultValue="To reset password, please enter the email you have used to register."
          state="default"
          style={{ width: 320 }}
        />
        <Textarea
          label="Disabled"
          placeholder="Hint text for Textarea"
          state="disabled"
          style={{ width: 320 }}
        />
        <Textarea
          label="Error"
          defaultValue="To reset password, please enter the email you have used to register."
          state="error"
          errorMessage="Sample error message"
          style={{ width: 320 }}
        />
      </div>

    </SectionBlock>
  );
}
