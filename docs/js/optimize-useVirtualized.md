---
title: 长列表渲染
group:
  title: optimize
---

```js
import { Col, ColProps, Row, RowProps } from 'antd';
import React, { CSSProperties, memo, ReactElement } from 'react';
import useVirtualized from './useVirtualized';

const layout = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 6,
  xxl: 4
};

type Props<T> = {
  scroll: boolean;
  scrollConfig?: {
    scrollElement?: () => HTMLElement; // 滚动元素
    rowCount: number; // 每行数量
    rowHeight: number; // 每行高度
    visualAreaHeight: number; // 视区高度
    extraScrollHeight?: number; // 滚动区域额外高度
  };
  dataSource: T[];
  renderItem: (item: T, index: number) => ReactElement;
  loading: boolean;
  rowKey?: string;
  rowProps?: RowProps & React.RefAttributes<HTMLDivElement>;
  style?: CSSProperties;
  colProps?: ColProps;
};

export default memo(function Example<T = any>({
  scrollConfig: { rowCount, rowHeight, scrollElement, visualAreaHeight, extraScrollHeight = 0 },
  dataSource = [],
  renderItem,
  rowKey = 'id',
  style,
  rowProps,
  colProps
}: Props<T>) {
  const { startIndex, endIndex } = useVirtualized({
    visualAreaHeight,
    scrollElement,
    rowCount,
    rowHeight,
    extraScrollHeight
  });

  return (
    <div style={style}>
      <Row gutter={4} {...rowProps}>
        {dataSource.map((item, index) => {
          if (index >= startIndex && index < endIndex) {
            return (
              <Col key={item[rowKey] + '-' + index} {...(colProps ?? layout)}>
                {renderItem(item, index)}
              </Col>
            );
          } else {
            return <Col style={{ height: rowHeight }} {...layout} />;
          }
        })}
      </Row>
    </div>
  );
});

```