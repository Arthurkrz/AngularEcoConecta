import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../core/services/storage';
import { ContactMessage } from '../../models/contact-message';

@Component({
  selector: 'app-contato',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
  private readonly formBuilder = inject(FormBuilder);
  private readonly storage = inject(StorageService);

  readonly feedback = signal('');
  readonly error = signal('');
  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[\p{L}\s]{3,}$/u)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  enviar(): void {
    this.feedback.set('');
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const entry: ContactMessage = {
      ...this.form.getRawValue(),
      id: Date.now(),
      createdAt: new Date().toLocaleString('pt-BR'),
    };
    try {
      const records = this.storage.read<ContactMessage>('messages');
      this.storage.write('messages', [...records, entry]);
      this.form.reset();
      this.feedback.set('Mensagem registrada neste navegador! Obrigado pelo contato.');
    } catch {
      this.error.set('Não foi possível salvar a mensagem neste navegador. Tente novamente.');
    }
  }
}
