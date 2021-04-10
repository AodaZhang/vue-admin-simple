/**
 * @description 业务列表Layout
 * @author aodazhang 2021.04.10
 */
import { defineComponent, PropType } from 'vue'
import { Button, Card, Col, Row } from 'ant-design-vue'
import {
  DownloadOutlined,
  ExportOutlined,
  ImportOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  name: 'PageLayout',

  props: {
    btnConfig: {
      type: Array as PropType<Layout.Button[]>,
      required: false
    }
  },

  emits: [
    'searchSubmit',
    'searchReset',
    'btnExport',
    'btnImport',
    'btnDownload'
  ],

  setup(props, ctx) {
    return () => {
      const { btnConfig } = props
      return (
        <div style="padding:24px;background-color:#fff;">
          {/* 筛选框 */}
          <Card>
            {ctx.slots.search && ctx.slots.search()}
            <Row gutter={[16, 16]} type="flex" justify="end">
              <Col>
                <Button type="primary" onClick={() => ctx.emit('searchSubmit')}>
                  查询
                </Button>
              </Col>
              <Col>
                <Button type="default" onClick={() => ctx.emit('searchReset')}>
                  清空
                </Button>
              </Col>
            </Row>
          </Card>
          {/* 功能按钮 */}
          {Array.isArray(btnConfig) && btnConfig.length && (
            <Row
              style="margin-top:10px;background-color:#fff;"
              gutter={[16, 16]}
            >
              {btnConfig.map(btn => {
                const { type, title } = btn || {}
                let button = null
                switch (type) {
                  case 'export':
                    button = (
                      <Button
                        type="primary"
                        v-slots={{ icon: () => <ExportOutlined /> }}
                        onClick={() => ctx.emit('btnExport')}
                      >
                        {title || '导出数据'}
                      </Button>
                    )
                    break
                  case 'import':
                    button = (
                      <Button
                        type="primary"
                        v-slots={{ icon: () => <ImportOutlined /> }}
                        onClick={() => ctx.emit('btnImport')}
                      >
                        {title || '导入数据'}
                      </Button>
                    )
                    break
                  case 'download':
                    button = (
                      <Button
                        type="dashed"
                        v-slots={{ icon: () => <DownloadOutlined /> }}
                        onClick={() => ctx.emit('btnDownload')}
                      >
                        {title || '下载模板'}
                      </Button>
                    )
                    break
                }
                return button && <Col>{button}</Col>
              })}
            </Row>
          )}
          {/* 数据列表 */}
          {ctx.slots.list && (
            <Row style="margin-top:18px">{ctx.slots.list()}</Row>
          )}
        </div>
      )
    }
  }
})
