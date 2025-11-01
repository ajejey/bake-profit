/**
 * Reusable PDF Generation Utility
 * Provides consistent styling and layout for all BakeProfit PDFs
 */

import jsPDF from 'jspdf'

export interface PDFConfig {
  orientation?: 'portrait' | 'landscape'
  unit?: 'mm' | 'pt' | 'in'
  format?: string | number[]
}

export interface TableColumn {
  header: string
  dataKey: string
  width?: number
  align?: 'left' | 'center' | 'right'
}

export interface TableRow {
  [key: string]: string | number
}

export class BakeProfitPDF {
  private doc: jsPDF
  private margin = 15
  private pageWidth: number
  private pageHeight: number
  private yPosition: number
  private contentWidth: number
  
  // Brand colors (rose theme)
  private colors = {
    primary: { r: 225, g: 29, b: 72 },      // rose-600
    secondary: { r: 251, g: 113, b: 133 },  // rose-400
    success: { r: 34, g: 197, b: 94 },      // green-500
    warning: { r: 234, g: 179, b: 8 },      // yellow-500
    error: { r: 220, g: 38, b: 38 },        // red-600
    gray: { r: 107, g: 114, b: 128 },       // gray-500
    lightGray: { r: 229, g: 231, b: 235 },  // gray-200
    darkGray: { r: 55, g: 65, b: 81 },      // gray-700
    black: { r: 0, g: 0, b: 0 },
    white: { r: 255, g: 255, b: 255 }
  }

  constructor(config: PDFConfig = {}) {
    this.doc = new jsPDF({
      orientation: config.orientation || 'portrait',
      unit: config.unit || 'mm',
      format: config.format || 'a4'
    })
    
    this.pageWidth = this.doc.internal.pageSize.getWidth()
    this.pageHeight = this.doc.internal.pageSize.getHeight()
    this.contentWidth = this.pageWidth - (this.margin * 2)
    this.yPosition = this.margin
  }

  /**
   * Check if we need a page break and add one if necessary
   */
  checkPageBreak(requiredSpace: number): boolean {
    if (this.yPosition + requiredSpace > this.pageHeight - this.margin - 15) {
      this.doc.addPage()
      this.yPosition = this.margin
      return true
    }
    return false
  }

  /**
   * Add a branded header with title and optional subtitle
   */
  addHeader(title: string, subtitle?: string, rightText?: string): void {
    // Background bar
    this.doc.setFillColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b)
    this.doc.rect(0, 0, this.pageWidth, 25, 'F')
    
    // Title
    this.doc.setFontSize(22)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor(255, 255, 255)
    this.doc.text(title, this.margin, 12)
    
    // Right text (e.g., order number)
    if (rightText) {
      const rightTextWidth = this.doc.getTextWidth(rightText)
      this.doc.setFontSize(16)
      this.doc.text(rightText, this.pageWidth - this.margin - rightTextWidth, 12)
    }
    
    // Subtitle
    if (subtitle) {
      this.doc.setFontSize(11)
      this.doc.setFont('helvetica', 'normal')
      this.doc.text(subtitle, this.margin, 19)
    }
    
    // Reset position after header
    this.yPosition = 32
    this.doc.setTextColor(0, 0, 0)
  }

  /**
   * Add a section header with optional icon
   */
  addSectionHeader(title: string, color: 'primary' | 'secondary' | 'gray' = 'primary'): void {
    this.checkPageBreak(12)
    
    const selectedColor = this.colors[color]
    
    // Section line
    this.doc.setDrawColor(selectedColor.r, selectedColor.g, selectedColor.b)
    this.doc.setLineWidth(0.5)
    this.doc.line(this.margin, this.yPosition, this.pageWidth - this.margin, this.yPosition)
    
    this.yPosition += 6
    
    // Section title
    this.doc.setFontSize(14)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor(selectedColor.r, selectedColor.g, selectedColor.b)
    this.doc.text(title, this.margin, this.yPosition)
    
    this.yPosition += 8
    this.doc.setTextColor(0, 0, 0)
  }

  /**
   * Add a key-value pair (label: value)
   */
  addKeyValue(label: string, value: string, bold: boolean = false): void {
    this.checkPageBreak(6)
    
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor(this.colors.darkGray.r, this.colors.darkGray.g, this.colors.darkGray.b)
    this.doc.text(`${label}:`, this.margin, this.yPosition)
    
    const labelWidth = this.doc.getTextWidth(`${label}:`)
    this.doc.setFont('helvetica', bold ? 'bold' : 'normal')
    this.doc.setTextColor(0, 0, 0)
    this.doc.text(value, this.margin + labelWidth + 2, this.yPosition)
    
    this.yPosition += 6
  }

  /**
   * Add a two-column layout for information
   */
  addTwoColumnInfo(leftLabel: string, leftValue: string, rightLabel: string, rightValue: string): void {
    this.checkPageBreak(6)
    
    const midPoint = this.pageWidth / 2
    
    // Left column
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor(this.colors.darkGray.r, this.colors.darkGray.g, this.colors.darkGray.b)
    this.doc.text(`${leftLabel}:`, this.margin, this.yPosition)
    
    const leftLabelWidth = this.doc.getTextWidth(`${leftLabel}:`)
    this.doc.setFont('helvetica', 'normal')
    this.doc.setTextColor(0, 0, 0)
    this.doc.text(leftValue, this.margin + leftLabelWidth + 2, this.yPosition)
    
    // Right column
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor(this.colors.darkGray.r, this.colors.darkGray.g, this.colors.darkGray.b)
    this.doc.text(`${rightLabel}:`, midPoint, this.yPosition)
    
    const rightLabelWidth = this.doc.getTextWidth(`${rightLabel}:`)
    this.doc.setFont('helvetica', 'normal')
    this.doc.setTextColor(0, 0, 0)
    this.doc.text(rightValue, midPoint + rightLabelWidth + 2, this.yPosition)
    
    this.yPosition += 6
  }

  /**
   * Add a bordered card/box with content
   */
  addCard(content: () => void, padding: number = 5): void {
    const startY = this.yPosition
    this.yPosition += padding
    
    // Execute content
    content()
    
    this.yPosition += padding
    const cardHeight = this.yPosition - startY
    
    // Draw border
    this.doc.setDrawColor(this.colors.lightGray.r, this.colors.lightGray.g, this.colors.lightGray.b)
    this.doc.setLineWidth(0.5)
    this.doc.roundedRect(this.margin, startY, this.contentWidth, cardHeight, 2, 2, 'S')
    
    this.yPosition += 3
  }

  /**
   * Add a simple table
   */
  addTable(columns: TableColumn[], rows: TableRow[]): void {
    this.checkPageBreak(20)
    
    const startY = this.yPosition
    const rowHeight = 8
    const headerHeight = 10
    
    // Calculate column widths
    const totalWidth = this.contentWidth
    const columnWidths = columns.map(col => col.width || totalWidth / columns.length)
    
    // Header background
    this.doc.setFillColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b)
    this.doc.rect(this.margin, startY, totalWidth, headerHeight, 'F')
    
    // Header text
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor(255, 255, 255)
    
    let xPos = this.margin
    columns.forEach((col, i) => {
      const text = col.header
      const textWidth = this.doc.getTextWidth(text)
      const colWidth = columnWidths[i]
      
      let textX = xPos + 2
      if (col.align === 'center') {
        textX = xPos + (colWidth - textWidth) / 2
      } else if (col.align === 'right') {
        textX = xPos + colWidth - textWidth - 2
      }
      
      this.doc.text(text, textX, startY + 7)
      xPos += colWidth
    })
    
    this.yPosition = startY + headerHeight
    
    // Rows
    this.doc.setTextColor(0, 0, 0)
    this.doc.setFont('helvetica', 'normal')
    
    rows.forEach((row, rowIndex) => {
      this.checkPageBreak(rowHeight + 5)
      
      // Alternate row background
      if (rowIndex % 2 === 0) {
        this.doc.setFillColor(250, 250, 250)
        this.doc.rect(this.margin, this.yPosition, totalWidth, rowHeight, 'F')
      }
      
      xPos = this.margin
      columns.forEach((col, i) => {
        const text = String(row[col.dataKey] || '')
        const textWidth = this.doc.getTextWidth(text)
        const colWidth = columnWidths[i]
        
        let textX = xPos + 2
        if (col.align === 'center') {
          textX = xPos + (colWidth - textWidth) / 2
        } else if (col.align === 'right') {
          textX = xPos + colWidth - textWidth - 2
        }
        
        this.doc.text(text, textX, this.yPosition + 6)
        xPos += colWidth
      })
      
      this.yPosition += rowHeight
    })
    
    // Table border
    this.doc.setDrawColor(this.colors.lightGray.r, this.colors.lightGray.g, this.colors.lightGray.b)
    this.doc.setLineWidth(0.5)
    this.doc.rect(this.margin, startY, totalWidth, this.yPosition - startY, 'S')
    
    this.yPosition += 5
  }

  /**
   * Add a horizontal separator line
   */
  addSeparator(color: 'light' | 'dark' = 'light'): void {
    this.checkPageBreak(5)
    
    const lineColor = color === 'light' ? this.colors.lightGray : this.colors.gray
    this.doc.setDrawColor(lineColor.r, lineColor.g, lineColor.b)
    this.doc.setLineWidth(0.3)
    this.doc.line(this.margin, this.yPosition, this.pageWidth - this.margin, this.yPosition)
    
    this.yPosition += 5
  }

  /**
   * Add a summary box (typically for totals)
   */
  addSummaryBox(items: { label: string; value: string; bold?: boolean }[]): void {
    this.checkPageBreak(items.length * 7 + 10)
    
    const boxWidth = 80
    const boxX = this.pageWidth - this.margin - boxWidth
    const startY = this.yPosition
    
    // Background
    this.doc.setFillColor(250, 250, 250)
    this.doc.rect(boxX, startY, boxWidth, items.length * 7 + 6, 'F')
    
    // Border
    this.doc.setDrawColor(this.colors.lightGray.r, this.colors.lightGray.g, this.colors.lightGray.b)
    this.doc.setLineWidth(0.5)
    this.doc.rect(boxX, startY, boxWidth, items.length * 7 + 6, 'S')
    
    // Items
    let itemY = startY + 8
    items.forEach(item => {
      this.doc.setFontSize(10)
      this.doc.setFont('helvetica', item.bold ? 'bold' : 'normal')
      this.doc.setTextColor(0, 0, 0)
      this.doc.text(item.label, boxX + 3, itemY)
      
      const valueWidth = this.doc.getTextWidth(item.value)
      this.doc.text(item.value, boxX + boxWidth - valueWidth - 3, itemY)
      
      itemY += 7
    })
    
    this.yPosition += items.length * 7 + 10
  }

  /**
   * Add a badge/tag
   */
  addBadge(text: string, color: 'primary' | 'success' | 'warning' | 'error' | 'gray', x?: number, y?: number): void {
    const badgeX = x || this.margin
    const badgeY = y || this.yPosition
    
    const selectedColor = this.colors[color]
    
    this.doc.setFontSize(9)
    this.doc.setFont('helvetica', 'bold')
    const textWidth = this.doc.getTextWidth(text)
    const badgeWidth = textWidth + 8
    const badgeHeight = 6
    
    // Background
    this.doc.setFillColor(selectedColor.r, selectedColor.g, selectedColor.b)
    this.doc.roundedRect(badgeX, badgeY - 4, badgeWidth, badgeHeight, 1, 1, 'F')
    
    // Text
    this.doc.setTextColor(255, 255, 255)
    this.doc.text(text, badgeX + 4, badgeY)
    
    this.doc.setTextColor(0, 0, 0)
    
    if (!x && !y) {
      this.yPosition += 8
    }
  }

  /**
   * Add footer with branding and page numbers
   */
  addFooter(customText?: string): void {
    const footerY = this.pageHeight - 10
    
    this.doc.setFontSize(8)
    this.doc.setFont('helvetica', 'italic')
    this.doc.setTextColor(this.colors.gray.r, this.colors.gray.g, this.colors.gray.b)
    
    const text = customText || 'Generated by BakeProfit - Bakery Management Software'
    const textWidth = this.doc.getTextWidth(text)
    this.doc.text(text, (this.pageWidth - textWidth) / 2, footerY)
    
    // Page number
    const pageText = `Page ${this.doc.getCurrentPageInfo().pageNumber}`
    const pageWidth = this.doc.getTextWidth(pageText)
    this.doc.text(pageText, this.pageWidth - this.margin - pageWidth, footerY)
  }

  /**
   * Add spacing
   */
  addSpace(mm: number = 5): void {
    this.yPosition += mm
  }

  /**
   * Add text with word wrap
   */
  addText(text: string, fontSize: number = 10, maxWidth?: number): void {
    const width = maxWidth || this.contentWidth
    this.doc.setFontSize(fontSize)
    this.doc.setFont('helvetica', 'normal')
    
    const lines = this.doc.splitTextToSize(text, width)
    lines.forEach((line: string) => {
      this.checkPageBreak(6)
      this.doc.text(line, this.margin, this.yPosition)
      this.yPosition += 6
    })
  }

  /**
   * Get current Y position
   */
  getYPosition(): number {
    return this.yPosition
  }

  /**
   * Set Y position
   */
  setYPosition(y: number): void {
    this.yPosition = y
  }

  /**
   * Save the PDF
   */
  save(filename: string): void {
    this.doc.save(filename)
  }

  /**
   * Get the PDF as blob
   */
  getBlob(): Blob {
    return this.doc.output('blob')
  }

  /**
   * Get the PDF as data URI
   */
  getDataUri(): string {
    return this.doc.output('datauristring')
  }
}
