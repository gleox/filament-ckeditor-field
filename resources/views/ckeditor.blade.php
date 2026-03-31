@php
    $name = $getName();
    $licenseKey = $getLicenseKey();
    $uploadUrl = $getUploadUrl();
    $placeholder = $getPlaceholder();
    $isConcealed = $isConcealed();
    $statePath = $getStatePath();
    $isDisabled = $isDisabled();
    // Create a safe identifier from statePath for use in JavaScript
    $editorId = str_replace(['.', '[', ']'], ['-', '-', ''], $statePath);

    $editorJs = 'https://unpkg.com/@gleox/ckeditor5@48.0.0/dist/ckeditor5.js';
    $editorCss = 'https://unpkg.com/@gleox/ckeditor5@48.0.0/dist/ckeditor5.css';

    $fieldJs = \Filament\Support\Facades\FilamentAsset::getScriptSrc('filament-ckeditor-field', package: 'kahusoftware/filament-ckeditor-field');
    $fieldCss = \Filament\Support\Facades\FilamentAsset::getStyleHref('filament-ckeditor-field', package: 'kahusoftware/filament-ckeditor-field');
@endphp

<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <x-filament::input.wrapper
        :valid="! $errors->has($statePath)"
    >
        <div wire:ignore>
            <div
                x-data="ckeditor({
                    licenseKey: '{{ $licenseKey }}',
                    state: $wire.$entangle('{{ $statePath }}'),
                    editorId: '{{ $editorId }}',
                    uploadUrl: '{{ $uploadUrl }}',
                    placeholder: '{{ $placeholder }}',
                    isDisabled: {{ $isDisabled ? 'true' : 'false' }}
                })"
                x-load-js="@js([$editorJs, $fieldJs])"
                x-load-css="@js([$editorCss, $fieldCss])"
            >
                <textarea
                    id="ckeditor-{{ $editorId }}"
                    name="{{ $name }}"
                    x-model="state"
                ></textarea>
            </div>
        </div>
    </x-filament::input.wrapper>
</x-dynamic-component>
