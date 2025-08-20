export interface ExtractedString {
    project_id: string | null
    reference_id: string
    value: string
    icu_format: string
    placeholders: string[]
    placeholder_mappings: { [key: string]: string }
    placeholder_types: { [key: string]: string }
    file_path: string
    file_name: string
    widget_hierarchy: string
    user_facing_type: string
    ui_purpose: string
    semantic_context: string
    code_snippet: string
    line_column: LineColumn
    offset: Offset
}

export interface LineColumn {
    line: number,
    column: number,
}

export interface Offset {
    start_offset: number,
    end_offset: number,
}